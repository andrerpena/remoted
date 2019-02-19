import { RemotedDatabase } from "../../db/model";
import { MutationResolvers } from "../resolver-types";
import CompanyInput = MutationResolvers.CompanyInput;
import { Company } from "../model";
import { DbCompany, DbCompanyInsert } from "../../db/model/company";
import { generateSlug } from "../../util/slug";

export async function insertCompany(
  db: RemotedDatabase,
  companyInput: CompanyInput
): Promise<Company> {
  const slug = generateSlug(companyInput.displayName);

  const company: DbCompanyInsert = {
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