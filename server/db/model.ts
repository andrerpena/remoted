import * as massive from "massive";
import { Writable } from "massive";
import { AnyObject } from "massive";
import { PartialBy } from "../../lib/type-helpers";
import { Nullable } from "../../lib/types";

export interface RemotedDatabase extends massive.Database {
  __remoted_get_jobs: (limit: number, offset: number) => Promise<DbJob[]>;

  job: Writable;
  company: Writable;
  company_url: Writable;
  stackoverflow_tags_cache: Writable;
  tag: Writable;
  job_tags: Writable;
}

export interface DbCompany extends AnyObject<any> {
  id: number;
  public_id: string;
  name: string;
  display_name: string;
}

export type DbCompanyInput = PartialBy<DbCompany, "id">;

export interface DbJob {
  id: number;
  public_id: string;
  title: string;
  description: string;
  description_html: string;
  company_id: number;
  company_name: string;
  company_display_name: string;
  created_at: Date;
  published_at: Date;
  tags: string;
  location_raw: Nullable<string>;
  location_required: Nullable<string>;
  location_preferred: Nullable<string>;
  location_preferred_timezone: Nullable<number>;
  location_preferred_timezone_tolerance: Nullable<number>;
  salary_raw: Nullable<string>;
  salary_exact: Nullable<number>;
  salary_min: Nullable<number>;
  salary_max: Nullable<number>;
  salary_currency: Nullable<string>;
  salary_equity: Nullable<boolean>;
  url: string;
}

export type DbJobInput = PartialBy<
  DbJob,
  "id" | "company_name" | "created_at" | "company_display_name"
>;

export interface DbJobTags {
  id: number;
  job_id: number;
  tag_id: number;
}

export interface DbTag {
  id: number;
  name: string;
  relevance: number;
}

export type DbTagInsert = PartialBy<DbTag, "id">;

export type DbCompanyUrl = {
  id: number;
  company_public_id: string;
  url: string;
};
