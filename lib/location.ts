import { Job } from "../graphql-types";

export function getLocationText(job: Job) {
  if (job.locationPreferred) {
    return `Preferred: ${job.locationRaw}`;
  }
}
