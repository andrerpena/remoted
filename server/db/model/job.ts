import { PartialBy } from "../../../lib/type-helpers";

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
  location_required?: string;
  location_preferred?: string;
  location_preferred_timezone?: number;
  location_preferred_timezone_tolerance?: number;
  salary_exact?: number;
  salary_min?: number;
  salary_max?: number;
  salary_equity?: boolean;
}

export type DbJobInsert = PartialBy<DbJob, "id" | "public_id">;
