import { AnyObject } from "massive";
import { PartialBy } from "../../../lib/type-helpers";

export interface DbCompany extends AnyObject<any> {
  id: number;
  public_id: string;
  name: string;
  display_name: string;
}

export type DbCompanyInsert = PartialBy<DbCompany, "id">;
