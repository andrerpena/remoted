import {
  DbCompany,
  DbCompanyInput,
  DbJob,
  DbJobInput,
  DbJobTags,
  DbTag,
  RemotedDatabase
} from "../../db/model";
import { insertDbRecord } from "../../db/services/db-helpers";
import { convertToHtml } from "../../lib/markdown";
import { Job, JobInput } from "../../../graphql-types";

export async function insertJob(
  db: RemotedDatabase,
  jobInput: JobInput
): Promise<Job | null> {
  // Get the company so that it can be denormalized
  const dbCompany = (await db.company.findOne({
    id: jobInput.companyId
  } as DbCompanyInput)) as DbCompany;
  if (!dbCompany) {
    // TODO: log error here
    return null;
  }

  const dbJobInput: DbJobInput = getDbJobInputFromJobInput(jobInput, {
    companyName: dbCompany.name,
    companyDisplayName: dbCompany.display_name,
    descriptionHtml: convertToHtml(jobInput.description),
    sanitizedTags: [] // TODO: fix sanatizedTags
  });

  const dbJob = await (insertDbRecord(db.job, dbJobInput) as Promise<DbJob>);
  const tags: string[] = [];
  for (let i = 0; i < dbJobInput.tags.length; i++) {
    let tag = (await db.tag.findOne({ name: dbJobInput.tags[i] })) as DbTag;
    if (!tag) {
      tag = (await db.tag.insert({
        name: dbJobInput.tags[i],
        relevance: 1
      } as DbTag)) as DbTag;
    }
    tags.push(tag.name);
    await db.job_tags.insert({ job_id: dbJob.id, tag_id: tag.id } as DbJobTags);
  }

  return getJobFromDbJob(dbJob, tags);
}

export async function getJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number
): Promise<Job[]> {
  const dbJobs = await db.__remoted_get_jobs(limit, offset);
  return dbJobs.map(j => {
    return getJobFromDbJob(j, j.tags.split(" "));
  });
}

export function getJobFromDbJob(dbJob: DbJob, tags: string[]): Job {
  return {
    id: dbJob.public_id,
    title: dbJob.title,
    description: dbJob.description,
    descriptionHtml: dbJob.description_html,
    tags: tags,
    createdAt: dbJob.created_at.toISOString(),
    publishedAt: dbJob.published_at.toISOString(),
    relativeUrl: "", // TODO: Fix,
    locationRaw: dbJob.location_raw,
    locationRequired: dbJob.location_required,
    locationPreferred: dbJob.location_preferred,
    locationPreferredTimeZone: dbJob.location_preferred_timezone,
    locationPreferredTimeZoneTolerance:
      dbJob.location_preferred_timezone_tolerance,
    salaryRaw: dbJob.salary_raw,
    salaryExact: dbJob.salary_exact,
    salaryMin: dbJob.salary_min,
    salaryMax: dbJob.salary_max,
    salaryCurrency: dbJob.salary_currency,
    salaryEquity: dbJob.salary_equity
  };
}

export interface GetDbJobInputFromJobInputOptions {
  descriptionHtml: string;
  sanitizedTags: string[];
  companyName: string;
  companyDisplayName: string;
}

export function getDbJobInputFromJobInput(
  jobInput: JobInput,
  options: GetDbJobInputFromJobInputOptions
): DbJobInput {
  return {
    title: jobInput.title,
    description: jobInput.description,
    description_html: options.descriptionHtml,
    published_at: new Date(jobInput.publishedAt),
    tags: options.sanitizedTags.join(" "),
    created_at: new Date(),
    company_id: jobInput.companyId,
    company_name: options.companyName,
    company_display_name: options.companyDisplayName,
    location_raw: jobInput.locationRaw || null,
    location_required: jobInput.locationRequired || null,
    location_preferred: jobInput.locationPreferred || null,
    location_preferred_timezone: jobInput.locationPreferredTimezone || null,
    location_preferred_timezone_tolerance:
      jobInput.locationPreferredTimezoneTolerance || null,
    salary_raw: jobInput.salaryRaw || null,
    salary_exact: jobInput.salaryExact || null,
    salary_min: jobInput.salaryMin || null,
    salary_max: jobInput.salaryMax || null,
    salary_currency: jobInput.salaryCurrency || null,
    salary_equity: jobInput.salaryEquity || null
  };
}
