import { DbGetJobsReturnType, DbJob, RemotedDatabase } from "../model";
import { Job } from "../../model";

export function insertJob(db: RemotedDatabase, job: Job): Promise<DbJob[]> {
  const date = new Date();
  const dbJobs: DbJob = {
    title: job.title,
    created_at: date,
    published_at: date
  };
  return db.job.insert([dbJobs]);
}

export function getJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number
): Promise<DbGetJobsReturnType[]> {
  return db._remoted_get_jobs(limit, offset);
}
