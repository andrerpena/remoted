import {
  DbCompany,
  DbCompanyInput,
  DbUrlRefence,
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

  const existingCompany = await getCompany(db, null, companyInput.urlReference);
  if (existingCompany) {
    return existingCompany;
  }

  const company: DbCompanyInput = {
    name: slug,
    public_id: generateCompanyPublicId(companyInput.displayName),
    display_name: companyInput.displayName
  };

  const dbCompany = await (db.company.insert(company) as Promise<DbCompany>);
  await db.url_reference.insert({
    company_public_id: dbCompany.public_id,
    url: companyInput.urlReference
  } as DbUrlRefence);

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

export async function getCompany(
  db: RemotedDatabase,
  publicId?: Nullable<string>,
  urlReference?: Nullable<string>
): Promise<Company | null> {
  if (publicId) {
    return getCompanyByPublicId(db, publicId);
  }
  // in case it is a reference
  let dbReference = await (db.url_reference.findOne({
    url: urlReference
  } as DbUrlRefence) as Promise<DbUrlRefence>);

  if (!dbReference || !dbReference.company_public_id) {
    return null;
  }

  return getCompanyByPublicId(db, dbReference.company_public_id);
}
