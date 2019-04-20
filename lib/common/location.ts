import { Job } from "../../graphql-types";

export function getLocationText(job: Job) {
  if (job.locationPreferred) {
    return `Preferred: ${job.locationRaw}`;
  }
}

// export function getLocationTagDisplay(locationTag: string) {
//   if(locationTag) {
//     switch (locationTag) {
//       case "us-only":
//     }
//   }
// }

export const US_ONLY = "us-only";
export const NORTH_AMERICA_ONLY = "north-america-only";
export const EUROPE_ONLY = "europe-only";
export const UK_ONLY = "uk-only";
