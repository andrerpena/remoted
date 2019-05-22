import {
  DbCompany,
  DbCompanyInput,
  DbJob,
  DbJobInput,
  DbJobTag,
  DbLocationDetails,
  DbTag,
  RemotedDatabase
} from "../../db/model";
import { insertDbRecord } from "../../db/db-helpers";
import { convertToHtml } from "../../../lib/server/markdown";
import { Job, JobInput } from "../../../graphql-types";
import { generateSlug, makeId } from "../../../lib/server/id";
import { Nullable } from "../../../lib/common/types";
import { isSourceValid } from "../../../lib/common/sources";
import { removeQueryString } from "../../../lib/common/url";
import { getDbLocationDetailsInputFromLocationDetailsInput } from "./location-details-service";

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

  // Add job_tags
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
      await db.job_tag.insert({
        job_id: dbJob.id,
        tag_id: dbTag.id
      } as DbJobTag);
    }
  }

  // Add location details
  if (jobInput.locationDetails) {
    const dbLocationDetailsInput = getDbLocationDetailsInputFromLocationDetailsInput(
      jobInput.locationDetails
    );
    const dbLocationDetailsForJob = (await db.location_details.insert({
      ...dbLocationDetailsInput
    })) as DbLocationDetails;
    dbJob.location_details_id = dbLocationDetailsForJob.id;
    await db.job.save(dbJob);

    // Add location details to company if it does not exist
    if (!dbCompany.location_details_id) {
      const dbLocationDetailsForCompany = (await db.location_details.insert({
        ...dbLocationDetailsInput
      } as DbLocationDetails)) as DbLocationDetails;
      dbCompany.location_details_id = dbLocationDetailsForCompany.id;
      await db.company.save(dbCompany);
    }
  }

  return getJobFromDbJob(dbJob);
}

export async function searchJobs(
  db: RemotedDatabase,
  limit: number,
  offset: number,
  tag?: Nullable<string>,
  anywhere?: Nullable<boolean>,
  excludeCountries?: Nullable<string[]>,
  excludeRegions?: Nullable<string[]>,
  salary?: Nullable<boolean>,
  sources?: Nullable<string[]>,
  companyPublicId?: Nullable<string>
): Promise<Job[]> {
  let companyId: number | null = null;

  if (companyPublicId) {
    const company = (await db.company.findOne({
      public_id: companyPublicId
    } as Partial<DbCompany>)) as DbCompany;
    if (company) {
      companyId = company.id;
    } else {
      // When we cannot find the company, we just return no jobs
      return [];
    }
  }

  const dbJobs = await db.getJobs({
    _limit: limit,
    _offset: offset,
    _tag: tag || null,
    _anywhere: anywhere || null,
    _excludeCountries:
      excludeCountries && excludeCountries.length ? excludeCountries : null,
    _excludeRegions:
      excludeRegions && excludeRegions.length ? excludeRegions : null,
    _sources: sources && sources.length ? sources : null,
    _salary: salary || null,
    _companyId: companyId || null
  });

  return dbJobs.map((j: DbJob) => {
    const job = getJobFromDbJob(j);
    job.locationDetails = {
      worldwideConfirmed: j["loc_worldwide_confirmed"],
      acceptedRegions: j["loc_accepted_regions"],
      acceptedCountries: j["loc_accepted_countries"],
      timeZoneMin: j["loc_timezone_min"],
      timeZoneMax: j["loc_timezone_max"],
      headquartersLocation: j["loc_headquarters_location"],
      description: j["loc_description"]
    };
    return job;
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
