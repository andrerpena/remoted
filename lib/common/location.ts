export function getLocationTagDisplay(locationTag: string) {
  switch (locationTag) {
    case "north-america-and-europe-only":
      return "North America and Europe only";
    case "us-and-europe-only":
      return "US and Europe only";
    case "americas-and-europe-only":
      return "Americas and Europe only";
    case "north-america-only":
      return "North America only";
    case "americas-only":
      return "Americas only";
    case "us-only":
      return "US only";
    case "europe-only":
      return "Europe only";
    case "uk-only":
      return "UK only";
    case "emea-only":
      return "EMEA only";
    case "mena-only":
      return "MENA only";
    case "africa-only":
      return "Africa only";
    case "oceania-only":
      return "Oceania only";
    case "australia-only":
      return "Australia only";
    default:
      return null;
  }
}

export const US_ONLY = "us-only";
export const NORTH_AMERICA_ONLY = "north-america-only";
export const EUROPE_ONLY = "europe-only";
export const UK_ONLY = "uk-only";
