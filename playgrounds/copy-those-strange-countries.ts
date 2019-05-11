// import * as countries from "./server/locations/countries.json";
// import { ContinentCode, CountryData } from "./server/locations/continents";
// import * as fs from "fs";
//
// const adjustedCountries: CountryData[] = [];
//
// function getContinent(country: any): ContinentCode | null {
//   switch (country.region) {
//     case "Asia":
//       return "AS";
//     case "Americas":
//       if (country["intermediate-region"] === "Caribbean") {
//         return "NA";
//       }
//       if (country["intermediate-region"] === "South America") {
//         return "SA";
//       }
//       return "NA";
//     case "Europe":
//       return "EU";
//     case "Africa":
//       return "AF";
//     case "Oceania":
//       return "OC";
//   }
//   console.log("Could not get country");
//   console.log(country);
//   return null;
// }
//
// for (let country of countries) {
//   const continent = getContinent(country);
//   if (continent !== null) {
//     adjustedCountries.push({
//       name: country.name,
//       regions: continent,
//       iso31662: country["alpha-2"]
//     });
//   }
// }
//
// fs.writeFileSync("./countries.json", JSON.stringify(adjustedCountries, null, 4));
