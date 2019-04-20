import {
  DbCompany,
  DbCompanyInput,
  DbJob,
  RemotedDatabase
} from "../../db/model";
import { generateSlug, makeId } from "../../../lib/server/id";
import { Company, CompanyInput } from "../../../graphql-types";
import { downloadImage, uploadFile } from "../../../lib/server/storage";
import { serverConfig } from "../../../lib/common/serverConfig";
import { resizeImage } from "../../../lib/server/image-processing";

export function generateCompanyPublicId(companyName: string) {
  const id = makeId();
  const companyNameSlug = generateSlug(companyName);
  return `${id}-${companyNameSlug}`;
}

export async function addCompany(
  db: RemotedDatabase,
  companyInput: CompanyInput
): Promise<Company> {
  const slug = generateSlug(companyInput.displayName);

  const existingCompany = await getCompanyByDisplayName(
    db,
    companyInput.displayName
  );
  if (existingCompany) {
    return existingCompany;
  }

  const company: DbCompanyInput = {
    name: slug,
    public_id: generateCompanyPublicId(companyInput.displayName),
    display_name: companyInput.displayName
  };

  const dbCompany = await (db.company.insert(company) as Promise<DbCompany>);

  if (companyInput.imageUrl) {
    try {
      await updateCompanyImageUrl(
        db,
        dbCompany.public_id,
        companyInput.imageUrl
      );
    } catch (ex) {
      // I will ignore for now
    }
  }

  return {
    id: dbCompany.public_id,
    displayName: dbCompany.display_name,
    name: dbCompany.name
  };
}

export function buildCompanyCdnImageUrl(imagePath: string) {
  return `${serverConfig.storageCdnHost}/${
    serverConfig.storageCompanyPath
  }/${imagePath}`;
}

export function getCompanyFromDbCompany(dbCompany: DbCompany): Company {
  return {
    id: dbCompany.public_id,
    displayName: dbCompany.display_name,
    name: dbCompany.name,
    imageUrl: dbCompany.image_url
      ? buildCompanyCdnImageUrl(dbCompany.image_url)
      : "",
    imageUrl20x20: dbCompany.image_url_20_20
      ? buildCompanyCdnImageUrl(dbCompany.image_url_20_20)
      : ""
  };
}

export async function getCompanyByPublicId(
  db: RemotedDatabase,
  publicId: string
): Promise<Company | null> {
  let dbCompany = await db.company.findOne({
    public_id: publicId
  } as DbCompany);
  if (!dbCompany) {
    return null;
  }
  return getCompanyFromDbCompany(dbCompany);
}

export async function getCompanyById(
  db: RemotedDatabase,
  id: number
): Promise<Company | null> {
  let dbCompany = await db.company.findOne({
    id: id
  } as DbCompany);
  if (!dbCompany) {
    return null;
  }
  return getCompanyFromDbCompany(dbCompany);
}

export async function getCompanyByDisplayName(
  db: RemotedDatabase,
  displayName: string
): Promise<Company | null> {
  let dbCompany = await db.company.findOne({
    display_name: displayName
  } as DbCompany);
  if (!dbCompany) {
    return null;
  }
  return getCompanyFromDbCompany(dbCompany);
}

export async function getCompanyByJobPublicId(
  db: RemotedDatabase,
  jobPublicId: string
): Promise<Company | null> {
  const dbJob = (await db.job.findOne({
    public_id: jobPublicId
  })) as DbJob;
  if (!dbJob) {
    return null;
  }
  const dbCompany = await db.company.findOne({
    id: dbJob.company_id
  });
  if (!dbCompany) {
    return null;
  }
  return getCompanyFromDbCompany(dbCompany);
}

/**
 * Uploads a company image.
 * Returns the relative path to be saved on the database
 */
export async function uploadCompanyImage(
  companySlug: string,
  buffer: Buffer,
  contentType?: string,
  suffix?: string
): Promise<string> {
  const location = await uploadFile(
    buffer,
    `${serverConfig.storageCompanyPath}/${companySlug}${
      suffix ? `-${suffix}` : ""
    }`,
    contentType
  );
  return location.Key.substring(location.Key.lastIndexOf("/") + 1);
}

export async function updateCompanyImageUrl(
  db: RemotedDatabase,
  public_id: string,
  imageUrl: string
): Promise<DbCompany> {
  const dbCompany = await db.company.findOne({
    public_id
  });
  if (!dbCompany) {
    throw new Error("dbCompany was not supposed to be null");
  }

  const companyImageBuffer = await downloadImage(imageUrl);
  const imageRelativePath = await uploadCompanyImage(
    public_id,
    companyImageBuffer.buffer,
    companyImageBuffer.contentType
  );
  let imageRelativePath20x20: string | null = null;

  try {
    const companyImageBuffer20x20 = await resizeImage(
      companyImageBuffer.buffer,
      20
    );
    imageRelativePath20x20 = await uploadCompanyImage(
      public_id,
      companyImageBuffer20x20,
      companyImageBuffer.contentType,
      "20x20"
    );
  } catch (ex) {
    console.log("Error resizing image");
    console.error(ex);
  }

  return db.company.save({
    ...dbCompany,
    ...({
      image_url: imageRelativePath,
      image_url_20_20: imageRelativePath20x20
    } as DbCompany)
  }) as Promise<DbCompany>;
}
