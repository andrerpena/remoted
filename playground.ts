import { config } from "dotenv";

config();
import { buildDb } from "./server/db/build-db";

buildDb().then(async db => {
  const jobs = await db.getJobs({
    _limit: 10,
    _offset: 0,
    _hasTag: "sql",
    _excludeUs: false,
    _excludeEurope: false,
    _excludeNorthAmerica: false,
    _excludeUk: false,
    _excludeWithoutSalary: false,
    _excludeStackoverflow: false,
    _excludeWeWorkRemotely: false
  });
  console.log(jobs);
  process.exit(0);
});
