import { DbCompany, DbCompanyInput, RemotedDatabase } from "../../db/model";
import { generateSlug } from "../../lib/id";
import { Company, CompanyInput } from "../../../graphql-types";

export async function insertCompany(
  db: RemotedDatabase,
  companyInput: CompanyInput
): Promise<Company> {
  const slug = generateSlug(companyInput.displayName).toLowerCase();

  const company: DbCompanyInput = {
    name: slug,
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
