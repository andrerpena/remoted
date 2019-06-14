import * as massive from "massive";
import { Writable } from "massive";
import { AnyObject } from "massive";
import { PartialBy } from "../../lib/common/type-helpers";
import { Nullable } from "../../lib/common/types";
import { TagCount } from "../../graphql-types";

export interface RemotedDatabase extends massive.Database {
  job: Writable;
  company: Writable;
  stackoverflow_tags_cache: Writable;
  tag: Writable;
  job_tag: Writable;
  location_details: Writable;
  getTags: (options: any) => Promise<TagCount[]>;
  getJobsSourceMap: () => Promise<DbJob[]>;
  getCompaniesSourceMap: () => Promise<DbCompany[]>;
  getTagsSourceMap: () => Promise<DbTag[]>;
}

export interface DbCompany extends AnyObject<any> {
  id: number;
  public_id: string;
  name: string;
  display_name: string;
  image_url?: string;
  image_url_20_20?: string;
  location_details_id?: number;
}

export interface DbLocationDetails extends AnyObject<any> {
  id: number;
  description: Nullable<string>;
  worldwide_confirmed: Nullable<boolean>;
  accepted_regions: Nullable<string[]>;
  accepted_countries: Nullable<string[]>;
  timezone_min: Nullable<number>;
  timezone_max: Nullable<number>;
  headquarters_location: Nullable<string>;
  enable_automatic_updates: Nullable<boolean>;
}

export type DbLocationDetailsInput = PartialBy<DbLocationDetails, "id">;

export type DbCompanyInput = PartialBy<DbCompany, "id">;

export interface DbJob {
  [key: string]: any;

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
  // deprecated location
  location_raw?: Nullable<string>;
  location_required?: Nullable<string>;
  location_preferred?: Nullable<string>;
  location_preferred_timezone?: Nullable<number>;
  location_preferred_timezone_tolerance?: Nullable<number>;
  location_tag?: Nullable<string>;
  // end - deprecated location
  salary_raw: Nullable<string>;
  salary_exact: Nullable<number>;
  salary_min: Nullable<number>;
  salary_max: Nullable<number>;
  salary_currency: Nullable<string>;
  salary_equity: Nullable<boolean>;
  url: string;
  source: string;
  location_details_id?: number;
}

export type DbJobInput = PartialBy<
  DbJob,
  "id" | "company_name" | "created_at" | "company_display_name"
>;

export interface DbJobTag {
  id: number;
  job_id: number;
  tag_id: number;
}

export interface DbTag {
  id: number;
  name: string;
  relevance: number;
}

export interface DbEmailSubscription {
  id: number;
  email: string;
  frequency: string;
  created_at: Date;
  last_sent_at: Date;
}
