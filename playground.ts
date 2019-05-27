import { config } from "dotenv";

config();
import { buildDb } from "./server/db/build-db";
import { getPostOnSlackOptions, postJobOnSlack } from "./server/slack";

buildDb().then(async db => {
  const jobs = await db.query(
    "select * from job order by published_at desc limit 20"
  );
  for (let job of jobs) {
    const slackOptions = await getPostOnSlackOptions(db, job.public_id);
    if (slackOptions) {
      await postJobOnSlack(slackOptions);
    }
  }
});
