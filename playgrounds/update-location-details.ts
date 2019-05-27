// import { config } from "dotenv";
//
// config();
//
// import { buildDb } from "./server/db/build-db";
// import { DbJob } from "./server/db/model";
// import { LocationDetailsInput } from "./graphql-types";
// import { extractLocation } from "./lib/common/jobseeker-location";
// import { merge } from "./lib/common/object";
// import { updateLocationDetails } from "./server/graphql/services/job-service";
//
// function isNullish(input: any): boolean {
//   return input === null || input === undefined;
// }
//
// buildDb().then(async db => {
//   const jobs = (await db.query("select * from job")) as DbJob[];
//   for (let job of jobs) {
//     console.log(`processing job ${job.public_id}`);
//     const dbCompany = await db.company.findOne({
//       id: job.company_id
//     });
//
//     let locationDetails: LocationDetailsInput = {};
//
//     if (!isNullish(job.location_preferred_timezone)) {
//       let tolerance = 0;
//       if (!isNullish(job.location_preferred_timezone_tolerance)) {
//         tolerance = job.location_preferred_timezone_tolerance as number;
//       }
//       locationDetails.timeZoneMin =
//         (job.location_preferred_timezone as number) - tolerance;
//       locationDetails.timeZoneMax =
//         (job.location_preferred_timezone as number) + tolerance;
//     }
//
//     const locationText = job.location_raw;
//
//     if (locationText) {
//       locationDetails = merge(
//         locationDetails,
//         extractLocation(job.description, true),
//         extractLocation(locationText, false)
//       );
//     }
//
//     await updateLocationDetails(
//       db,
//       job.public_id,
//       dbCompany.public_id,
//       locationDetails,
//       true
//     );
//
//     job.location_required;
//   }
// });
