import { RemotedDatabase } from "../../db/model";
import { DbJob, DbJobInsert } from "../../db/model/job";
import { Job } from "../model";
import { MutationResolvers } from "../resolver-types";
import { insertDbRecord } from "../../db/services/db-helpers";
import { DbJobTags } from "../../db/model/job-tags";
import { DbTag } from "../../db/model/tag";
import JobInput = MutationResolvers.JobInput;

export async function insertJob(
  db: RemotedDatabase,
  jobInput: JobInput
): Promise<Job> {
  const job: DbJobInsert = {
    title: jobInput.title,
    description: jobInput.description,
    published_at: new Date(jobInput.publishedAt),
    created_at: new Date(),
    company_id: jobInput.companyId
  };

  const dbJob = await (insertDbRecord(db.job, job) as Promise<DbJob>);
  for (let i = 0; i < jobInput.tags.length; i++) {
    let tag = await db.tag.findOne({ name: jobInput.tags[i] });
    if (!tag) {
      tag = await db.tag.insert({
        name: jobInput.tags[i],
        relevance: 1
      } as DbTag);
    }
    await db.job_tags.insert({ job_id: dbJob.id, tag_id: tag.id } as DbJobTags);
  }

  return {
    id: dbJob.public_id,
    title: dbJob.title,
    description: dbJob.description,
    createdAt: dbJob.created_at.toISOString(),
    publishedAt: dbJob.published_at.toISOString(),
    tags: jobInput.tags,
    relativeUrl: "" // TODO: Fix
  };
}

export async function getJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number
): Promise<Job[]> {
  const dbJobs = await db._remoted_get_jobs(limit, offset);
  return dbJobs.map(j => {
    return {
      id: j.public_id,
      title: j.title,
      description: j.description,
      relativeUrl: "", // fix this,
      tags: [],
      publishedAt: "xxx",
      createdAt: "xxx",
      company: undefined,
      location: undefined,
      salary: undefined
    };
  });
}
