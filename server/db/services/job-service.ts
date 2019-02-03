import { RemotedDatabase } from "../model";
import { insertOne } from "./db-helpers";
import { DbGetJobsReturnType, DbJob, DbJobInsert } from "../model/job";
import { getTag, insertTag } from "./tag-service";
import { insertJobTags } from "./job-tags-service";

export async function insertJob(
  db: RemotedDatabase,
  job: DbJobInsert
): Promise<DbJob> {
  const dbJob = await (insertOne(db.job, job) as Promise<DbJob>);
  for (let i = 0; i < job.tags.length; i++) {
    let tag = await getTag(db, job.tags[i]);
    if (!tag) {
      tag = await insertTag(db, {
        name: job.tags[i],
        relevance: 1
      });
    }
    await insertJobTags(db, dbJob.id, tag.id);
  }
  return dbJob;
}

export function getJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number
): Promise<DbGetJobsReturnType[]> {
  return db._remoted_get_jobs(limit, offset);
}
