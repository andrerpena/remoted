export type ContinentCode = "AF" | "AS" | "EU" | "NA" | "OC" | "SA";

export interface CountryData {
  displayName: string;
  iso31662Name: string;
  continentCode: ContinentCode;
}
