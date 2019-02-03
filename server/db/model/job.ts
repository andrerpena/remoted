import { AnyObject } from "massive";
import { PartialBy } from "../../../lib/type-helpers";

export interface DbJob extends AnyObject<any> {
  id: number;
  public_id: string;
  title: string;
  company_id: number;
  created_at: Date;
  published_at: Date;
}

export type DbJobInsert = PartialBy<DbJob, "id" | "public_id"> & {
  tags: string[];
};

export interface DbGetJobsReturnType {
  id: number;
  public_id: string;
  title: string;
}
