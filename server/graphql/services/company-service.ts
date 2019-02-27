import {
  DbCompany,
  DbCompanyInput,
  DbCompanyUrl,
  DbJob,
  RemotedDatabase
} from "../../db/model";
import { generateSlug, makeId } from "../../lib/id";
import { Company, CompanyInput } from "../../../graphql-types";
import { Nullable } from "../../../lib/types";

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

  const existingCompany = await getCompany(db, null, companyInput.url);
  if (existingCompany) {
    return existingCompany;
  }

  const company: DbCompanyInput = {
    name: slug,
    public_id: generateCompanyPublicId(companyInput.displayName),
    display_name: companyInput.displayName
  };

  const dbCompany = await (db.company.insert(company) as Promise<DbCompany>);
  await db.company_url.insert({
    company_id: dbCompany.id,
    url: companyInput.url
  } as DbCompanyUrl);

  return {
    id: dbCompany.public_id,
    displayName: dbCompany.display_name,
    name: dbCompany.name
  };
}

export function getCompanyFromDbCompany(dbCompany: DbCompany): Company {
  return {
    id: dbCompany.public_id,
    displayName: dbCompany.display_name,
    name: dbCompany.name
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

export async function getCompany(
  db: RemotedDatabase,
  publicId?: Nullable<string>,
  url?: Nullable<string>
): Promise<Company | null> {
  if (publicId) {
    return getCompanyByPublicId(db, publicId);
  }
  // in case it is a reference
  let dbCompanyUrl = await (db.company_url.findOne({
    url: url
  } as DbCompanyUrl) as Promise<DbCompanyUrl>);

  if (!dbCompanyUrl || !dbCompanyUrl.company_id) {
    return null;
  }

  return getCompanyById(db, dbCompanyUrl.company_id);
}
