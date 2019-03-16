import { config } from "dotenv";

config();
import { buildDb } from "./server/db/build-db";
import { DbJobTag, DbTag } from "./server/db/model";

buildDb().then(async db => {
  const jobs = await db.query("select * from job");
  console.log(jobs.length);
  for (let dbJob of jobs) {
    const tagsSplit = dbJob.tags.split(" ");
    for (let i = 0; i < tagsSplit.length; i++) {
      const tagName = tagsSplit[i];
      let dbTag = (await db.tag.findOne({ name: tagName })) as DbTag;
      if (!dbTag) {
        dbTag = (await db.tag.insert({
          name: tagName,
          relevance: 1
        } as DbTag)) as DbTag;
      }
      await db.job_tag.insert({
        job_id: dbJob.id,
        tag_id: dbTag.id
      } as DbJobTag);
    }
  }
});
