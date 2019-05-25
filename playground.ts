import { config } from "dotenv";

config();

import { buildDb } from "./server/db/build-db";
import { DbJob } from "./server/db/model";
import { LocationDetailsInput } from "./graphql-types";

function isNullish(input: any): boolean {
  return input === null || input === undefined;
}

buildDb().then(async db => {
  const jobs = (await db.query("select * from job")) as DbJob[];
  for (let job of jobs) {
    const locationDetails: LocationDetailsInput = {};

    if (!isNullish(job.location_preferred_timezone)) {
      let tolerance = 0;
      if (!isNullish(job.location_preferred_timezone_tolerance)) {
        tolerance = job.location_preferred_timezone_tolerance as number;
      }
      locationDetails.timeZoneMin =
        (job.location_preferred_timezone as number) - tolerance;
      locationDetails.timeZoneMax =
        (job.location_preferred_timezone as number) + tolerance;
    }

    job.location_required;
  }
});
