export interface Job {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  publishedAt: string;
  relativeUrl: string;
  company?: Company;
  salary?: SalaryDetails;
  location?: LocationDetails;
}

export interface Company {
  id: string;
  name: string;
  displayName: string;
  relativeUrl: string;
}

export interface LocationDetails {
  raw: string;
  requiredLocation?: string;
  preferredLocation?: string;
  preferredTimeZone?: number;
  preferredTimeZoneTolerance?: number;
}

export interface SalaryDetails {
  raw: string;
  exact?: number;
  min?: number;
  max?: number;
  currency?: string;
  equity?: boolean;
}
