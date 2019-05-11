export type Region =
  | "Southern Asia"
  | "Asia"
  | "Northern Europe"
  | "Europe"
  | "Southern Europe"
  | "Northern Africa"
  | "Africa"
  | "Caribbean"
  | "Americas"
  | "South America"
  | "Australia and New Zealand"
  | "Oceania"
  | "Western Europe"
  | "Eastern Europe"
  | "Middle Africa"
  | "Sub-Saharan Africa"
  | "South-eastern Asia"
  | "Eastern Asia"
  | "Eastern Africa"
  | "Central America"
  | "Polynesia"
  | "Western Africa"
  | "Southern Africa"
  | "Melanesia"
  | "North America"
  | "Micronesia"
  | "Channel Islands"
  | "Central Asia"
  | "Middle East";

export interface CountryData {
  displayName: string;
  iso31662Name: string;
  regions: Region[];
}
