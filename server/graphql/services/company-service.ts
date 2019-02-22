import { DbCompany, DbCompanyInput, RemotedDatabase } from "../../db/model";
import { generateSlug, makeId } from "../../lib/id";
import { Company, CompanyInput } from "../../../graphql-types";

export function generateCompanyPublicId(oompanyName: string) {
  const id = makeId();
  const companyNameSlug = generateSlug(oompanyName);
  return `${id}-${companyNameSlug}`;
}

export async function insertCompany(
  db: RemotedDatabase,
  companyInput: CompanyInput
): Promise<Company> {
  const slug = generateSlug(companyInput.displayName);

  const company: DbCompanyInput = {
    name: slug,
    public_id: generateCompanyPublicId(companyInput.displayName),
    display_name: companyInput.displayName
  };

  const dbCompany = await (db.company.insert(company) as Promise<DbCompany>);

  return {
    id: dbCompany.public_id,
    displayName: dbCompany.display_name,
    name: dbCompany.name,
    relativeUrl: "" // TODO: fix this
  };
}
