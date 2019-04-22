// import { config } from "dotenv";
//
// config();
// import { buildDb } from "./server/db/build-db";
// import { DbJob } from "./server/db/model";
//
// buildDb().then(async db => {
//   const jobs = (await db.query("select * from job")) as DbJob[];
//   for (let job of jobs) {
//     console.log(`Saving ${job.id}`);
//     await db.job.save({
//       id: job.id,
//       location_tag: extractLocationTag(
//         job.location_required || "",
//         job.title,
//         job.description
//       )
//     } as Partial<DbJob>);
//   }
// });
//
// // general
// const prefixes = ["location", "location:"];
// const suffixes = ["residents", "candidates", "based"];
// export const conjunctions = ["and", "or", "&"];
//
// // location specific
// const us = ["US", "USA", "U.S.A", "U.S.A", "United States"];
// export const europe = ["Europe", "EU", "European Union"];
// const uk = ["UK", "United Kingdom", "England"];
// export const northAmerica = [
//   "north america",
//   ...flatten([us, conjunctions, ["canada"]])
// ];
// const americas = ["americas", "north and south america"];
// const emea = ["emea", "europe middle east africa"];
// const mena = ["mena", "Middle East North Africa"];
// const usAndEurope = flatten([us, conjunctions, europe]);
// export const northAmericaAndEurope = flatten([
//   northAmerica,
//   conjunctions,
//   europe
// ]);
// const americasAndEurope = flatten([americas, conjunctions, europe]);
// const africa = ["africa"];
// const australia = ["australia"];
// const oceania = ["oceania"];
//
// export function flatten(input: string[][]): string[] {
//   if (input.length === 0) {
//     return [];
//   }
//   if (input.length === 1) {
//     return input[0];
//   }
//   const flattenedChildren = flatten(input.slice(1, input.length));
//   const result: string[] = [];
//   for (let item of input[0]) {
//     for (let child of flattenedChildren) {
//       result.push(item.toLowerCase() + " " + child.toLowerCase());
//     }
//   }
//   return result;
// }
//
// export function stripText(input: string) {
//   if (!input) {
//     return "";
//   }
//   return input.toLowerCase();
// }
//
// export function findInCombinations(textToFind: string, combinations: string[]) {
//   return (
//     combinations.findIndex(
//       c => stripText(textToFind).indexOf(stripText(c)) !== -1
//     ) !== -1
//   );
// }
//
// export interface LocationTagMatcher {
//   locationTag: string;
//   combinations: string[];
// }
//
// export function extractLocationTag(
//   locationRequired: string,
//   jobTitle: string,
//   jobDescription: string
// ): string | null {
//   // exceptions
//   if (locationRequired) {
//     if (
//       locationRequired.toLowerCase().indexOf("worldwide") !== -1 ||
//       locationRequired.toLowerCase().indexOf("anywhere") !== -1 ||
//       locationRequired.toLowerCase().indexOf("timezone") !== -1 ||
//       locationRequired.toLowerCase().indexOf("time zone") !== -1
//     ) {
//       return null;
//     }
//     if (locationRequired.length >= 35) {
//       return null;
//     }
//   }
//
//   const locationRequiredMatchers: LocationTagMatcher[] = [
//     {
//       locationTag: "north-america-and-europe-only",
//       combinations: northAmericaAndEurope
//     },
//     {
//       locationTag: "us-and-europe-only",
//       combinations: usAndEurope
//     },
//     {
//       locationTag: "americas-and-europe-only",
//       combinations: americasAndEurope
//     },
//     {
//       locationTag: "north-america-only",
//       combinations: northAmerica
//     },
//     {
//       locationTag: "americas-only",
//       combinations: americas
//     },
//     {
//       locationTag: "us-only",
//       combinations: us
//     },
//     {
//       locationTag: "europe-only",
//       combinations: europe
//     },
//     {
//       locationTag: "uk-only",
//       combinations: uk
//     },
//     {
//       locationTag: "emea-only",
//       combinations: emea
//     },
//     {
//       locationTag: "mena-only",
//       combinations: mena
//     },
//     {
//       locationTag: "africa-only",
//       combinations: africa
//     },
//     {
//       locationTag: "oceania-only",
//       combinations: oceania
//     },
//     {
//       locationTag: "australia-only",
//       combinations: australia
//     }
//   ];
//
//   // process location required
//   for (let matcher of locationRequiredMatchers) {
//     // process location required
//     if (findInCombinations(locationRequired, matcher.combinations)) {
//       return matcher.locationTag;
//     }
//     // process title and body
//     if (
//       findInCombinations(jobTitle, flatten([prefixes, matcher.combinations])) ||
//       findInCombinations(jobTitle, flatten([matcher.combinations, suffixes]))
//     ) {
//       return matcher.locationTag;
//     }
//     if (
//       findInCombinations(
//         jobDescription,
//         flatten([prefixes, matcher.combinations])
//       ) ||
//       findInCombinations(
//         jobDescription,
//         flatten([matcher.combinations, suffixes])
//       )
//     ) {
//       return matcher.locationTag;
//     }
//   }
//   return null;
// }
