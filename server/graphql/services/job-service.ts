import {
  DbCompany,
  DbCompanyInput,
  DbJob,
  DbJobInput,
  DbJobTag,
  DbTag,
  RemotedDatabase
} from "../../db/model";
import { insertDbRecord } from "../../db/services/db-helpers";
import { convertToHtml } from "../../../lib/server/markdown";
import { Job, JobInput } from "../../../graphql-types";
import { generateSlug, makeId } from "../../../lib/server/id";
import { Nullable } from "../../../lib/common/types";
import { isSourceValid } from "../../../lib/common/sources";
import { removeQueryString } from "../../../lib/common/url";

export async function getJob(
  db: RemotedDatabase,
  publicId?: Nullable<string>,
  url?: Nullable<string>
): Promise<Job | null> {
  let dbJob = await db.job.findOne({
    or: [
      {
        public_id: publicId
      },
      {
        url
      }
    ]
  });
  if (!dbJob) {
    return null;
  }
  return getJobFromDbJob(dbJob);
}

export async function addJob(
  db: RemotedDatabase,
  jobInput: JobInput
): Promise<Job | null> {
  let normalizedUrl;
  try {
    normalizedUrl = removeQueryString(jobInput.url);
  } catch (error) {
    // Let's just ignore
    normalizedUrl = jobInput.url;
  }

  const existingJob = await getJob(db, undefined, normalizedUrl);
  if (existingJob) {
    return existingJob;
  }
  // Get the company so that it can be denormalized
  let dbCompany = (await db.company.findOne({
    public_id: jobInput.companyId
  } as DbCompanyInput)) as DbCompany;
  if (!dbCompany) {
    // TODO: log error here
    return null;
  }

  // validate the source
  if (!isSourceValid(jobInput.source)) {
    throw new Error(`Invalid source: ${jobInput.source}`);
  }

  const dbJobInput: DbJobInput = getDbJobInputFromJobInput(jobInput, {
    companyName: dbCompany.name,
    companyDisplayName: dbCompany.display_name,
    descriptionHtml: convertToHtml(jobInput.description),
    sanitizedTags: jobInput.tags,
    companyId: dbCompany.id,
    normalizedUrl: normalizedUrl
  });

  const dbJob = await (insertDbRecord(db.job, dbJobInput) as Promise<DbJob>);

  const tags: string[] = [];
  if (dbJobInput.tags) {
    const tagsSplit = dbJobInput.tags.split(" ");
    for (let i = 0; i < tagsSplit.length; i++) {
      const tagName = tagsSplit[i];
      let dbTag = (await db.tag.findOne({ name: tagName })) as DbTag;
      if (!dbTag) {
        dbTag = (await db.tag.insert({
          name: tagName,
          relevance: 1
        } as DbTag)) as DbTag;
      }
      tags.push(dbTag.name);
      await db.job_tag.insert({
        job_id: dbJob.id,
        tag_id: dbTag.id
      } as DbJobTag);
    }
  }

  return getJobFromDbJob(dbJob);
}

export async function getJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number,
  tag?: Nullable<string>,
  regionFree?: Nullable<boolean>,
  excludeLocationTags?: Nullable<string[]>,
  salary?: Nullable<boolean>,
  sources?: Nullable<string[]>
): Promise<Job[]> {
  // create function "__remoted_get_jobs"(_limit integer, _offset integer, _hastag character varying, _excludeus boolean, _excludenorthamerica boolean, _excludeeurope boolean, _excludeuk boolean, _excludewithoutsalary boolean, _excludestackoverflow boolean, _excludeweworkremotely boolean) returns SETOF job
  const dbJobs = await db.getJobs({
    _limit: limit,
    _offset: offset,
    _tag: tag || null,
    _regionFree: regionFree || null,
    _excludeLocationTags:
      excludeLocationTags && excludeLocationTags.length
        ? excludeLocationTags
        : null,
    _sources: sources && sources.length ? sources : null,
    _salary: salary || null
  });

  return dbJobs.map((j: DbJob) => {
    return getJobFromDbJob(j);
  });
}

export function getJobFromDbJob(dbJob: DbJob): Job {
  return {
    id: dbJob.public_id,
    title: dbJob.title,
    description: dbJob.description,
    descriptionHtml: dbJob.description_html,
    tags: dbJob.tags.split(" "),
    createdAt: dbJob.created_at.toISOString(),
    publishedAt: dbJob.published_at.toISOString(),
    locationRaw: dbJob.location_raw,
    locationRequired: dbJob.location_required,
    locationPreferred: dbJob.location_preferred,
    locationPreferredTimeZone: dbJob.location_preferred_timezone,
    locationPreferredTimeZoneTolerance:
      dbJob.location_preferred_timezone_tolerance,
    locationTag: dbJob.location_tag,
    salaryRaw: dbJob.salary_raw,
    salaryExact: dbJob.salary_exact,
    salaryMin: dbJob.salary_min,
    salaryMax: dbJob.salary_max,
    salaryCurrency: dbJob.salary_currency,
    salaryEquity: dbJob.salary_equity,
    url: dbJob.url,
    source: dbJob.source
  };
}

export interface GetDbJobInputFromJobInputOptions {
  descriptionHtml: string;
  sanitizedTags: string[];
  companyName: string;
  companyDisplayName: string;
  companyId: number;
  normalizedUrl: string;
}

export function getDbJobInputFromJobInput(
  jobInput: JobInput,
  options: GetDbJobInputFromJobInputOptions
): DbJobInput {
  return {
    public_id: generateJobPublicId(jobInput.title, options.companyDisplayName),
    title: jobInput.title,
    description: jobInput.description,
    description_html: options.descriptionHtml,
    published_at: new Date(jobInput.publishedAt),
    tags: options.sanitizedTags.join(" "),
    company_id: options.companyId,
    company_name: options.companyName,
    company_display_name: options.companyDisplayName,
    location_raw: jobInput.locationRaw || null,
    location_required: jobInput.locationRequired || null,
    location_preferred: jobInput.locationPreferred || null,
    location_preferred_timezone: jobInput.locationPreferredTimezone || null,
    location_preferred_timezone_tolerance:
      jobInput.locationPreferredTimezoneTolerance || null,
    location_tag: jobInput.locationTag || null,
    salary_raw: jobInput.salaryRaw || null,
    salary_exact: jobInput.salaryExact || null,
    salary_min: jobInput.salaryMin || null,
    salary_max: jobInput.salaryMax || null,
    salary_currency: jobInput.salaryCurrency || null,
    salary_equity: jobInput.salaryEquity || null,
    url: options.normalizedUrl,
    source: jobInput.source
  };
}

export function generateJobPublicId(jobTitle: string, companyName: string) {
  const id = makeId();
  const jobTitleSlug = generateSlug(jobTitle);
  const companyNameSlug = generateSlug(companyName);
  return `${id}-remote-${jobTitleSlug}-${companyNameSlug}`;
}
