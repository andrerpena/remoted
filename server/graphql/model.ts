import { Nullable } from "../../lib/types";

export interface Job {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  createdAt: string;
  publishedAt: string;
  relativeUrl: string;
  company?: Company;
  locationRaw: Nullable<string>;
  locationRequired: Nullable<string>;
  locationPreferred: Nullable<string>;
  locationPreferredTimeZone: Nullable<number>;
  locationPreferredTimeZoneTolerance: Nullable<number>;
  salaryRaw: Nullable<string>;
  salaryExact: Nullable<number>;
  salaryMin: Nullable<number>;
  salaryMax: Nullable<number>;
  salaryCurrency: Nullable<string>;
  salaryEquity: Nullable<boolean>;
}

export interface Company {
  id: string;
  name: string;
  displayName: string;
  relativeUrl: string;
}
