import { RemotedDatabase } from "../model";
import { insertOne } from "./db-helpers";
import { DbCompany, DbCompanyInsert } from "../model/company";

export function insertCompany(
  db: RemotedDatabase,
  company: DbCompanyInsert
): Promise<DbCompany> {
  return insertOne(db.company, company) as Promise<DbCompany>;
}
