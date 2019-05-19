import * as countries from "./server/locations/countries_raw.json";
import * as fs from "fs";
import { CountryData, Region } from "./lib/common";

const adjustedCountries: CountryData[] = [];

for (let country of countries) {
  adjustedCountries.push({
    displayName: country.name,
    regions: [
      country["intermediate-region"] as Region,
      country["sub-region"] as Region,
      country["region"] as Region
    ].filter(i => !!i),
    iso31662Name: country["alpha-2"]
  });
}

fs.writeFileSync(
  "./server/locations/countries.ts",
  `import { CountryData } from "./index";\n\nexport const countries: CountryData[] = ${JSON.stringify(
    adjustedCountries,
    null,
    4
  )}`
);
