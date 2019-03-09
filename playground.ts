import { config } from "dotenv";

config();
import { buildDb } from "./server/db/build-db";
import { getJob } from "./server/graphql/services/job-service";

buildDb().then(async db => {
  const job = await getJob(
    db,
    "8fnpy-remote-senior-mobile-developer-emoney-advisor"
  );
  console.log(job);
});
