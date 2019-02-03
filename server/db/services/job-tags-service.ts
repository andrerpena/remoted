import { RemotedDatabase } from "../model";
import { DbJobTags } from "../model/job-tags";
import { insertOne } from "./db-helpers";

export async function insertJobTags(
  db: RemotedDatabase,
  jobId: number,
  tagId: number
): Promise<DbJobTags> {
  return insertOne(db.job_tags, {
    job_id: jobId,
    tag_id: tagId
  }) as Promise<DbJobTags>;
}
