import { countries } from "./countries";
import { naturalJoin } from "./array";

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

export interface CountryIndex {
  [key: string]: CountryData;
}

const countryIndex = countries.reduce(
  (accumulated: CountryIndex, current: CountryData) => {
    accumulated[current.iso31662Name] = current;
    return accumulated;
  },
  {} as CountryIndex
);

export function getAcceptedLocationText(
  acceptedCountries?: string[] | null,
  acceptedRegions?: string[] | null
): string {
  const countries = (acceptedCountries
    ? acceptedCountries
        .map(c => (countryIndex[c] ? countryIndex[c].displayName : null))
        .filter(c => !!c)
    : []) as string[];
  const regions = acceptedRegions
    ? acceptedRegions.filter(ac => !!ac)
    : ([] as string[]);
  return naturalJoin([...countries, ...regions], "or");
}

function convertNaturalIntegerToString(n: number): string {
  if (n > 0) {
    return `+${n}`;
  }
  return `${n}`;
}

export function getTimezoneText(
  timezoneMin?: number | null,
  timezoneMax?: number | null
): string {
  if (
    timezoneMin === null ||
    timezoneMin === undefined ||
    (timezoneMax === null || timezoneMax === undefined)
  ) {
    return "";
  }
  if (timezoneMin === timezoneMax) {
    return `UTC ${convertNaturalIntegerToString(timezoneMin)}`;
  }
  return `UTC ${convertNaturalIntegerToString(
    timezoneMin
  )} to UTC ${convertNaturalIntegerToString(timezoneMax)}`;
}

export const US_ONLY = "us-only";
export const NORTH_AMERICA_ONLY = "north-america-only";
export const EUROPE_ONLY = "europe-only";
export const UK_ONLY = "uk-only";
