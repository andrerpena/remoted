// @ts-ignore
import * as sm from "sitemap";
import { buildDb } from "./db/build-db";
import { config } from "dotenv";
import {
  linkToCompanyCanonical,
  linkToJobCanonical,
  linkToTagCanonical
} from "../lib/common/url";

config();

const getCompaniesUrls = async () => {
  const db = await buildDb();
  const companies = await db.getCompaniesSourceMap();
  return companies.map(j => ({
    url: linkToCompanyCanonical({ company: j.public_id }),
    changefreq: "daily",
    priotity: 0.5
  }));
};

const getTagsUrls = async () => {
  const db = await buildDb();
  const tags = await db.getTagsSourceMap();
  return [
    ...tags.map(j => ({
      url: linkToTagCanonical({ tag: j.name }),
      changefreq: "daily",
      priotity: 1.0
    })),
    ...tags.map(j => ({
      url: linkToTagCanonical({ tag: j.name, anywhere: true }),
      changefreq: "daily",
      priotity: 1.0
    })),
    ...tags.map(j => ({
      url: linkToTagCanonical({ tag: j.name, salary: true }),
      changefreq: "daily",
      priotity: 1.0
    })),
    ...tags.map(j => ({
      url: linkToTagCanonical({ tag: j.name, anywhere: true, salary: true }),
      changefreq: "daily",
      priotity: 1.0
    }))
  ];
};

const getJobUrls = async () => {
  const db = await buildDb();
  const jobs = await db.getJobsSourceMap();
  return jobs.map(j => ({
    url: linkToJobCanonical(j.public_id),
    changefreq: "daily",
    priotity: 0.8
  }));
};

const getSiteMapUrls = async () => {
  let result: any[] = [];
  // tags
  try {
    result = [...result, ...(await getTagsUrls())];
  } catch (e) {
    console.error(e);
  }
  // companies
  try {
    result = [...result, ...(await getCompaniesUrls())];
  } catch (e) {
    console.error(e);
  }
  // jobs
  try {
    result = [...result, ...(await getJobUrls())];
  } catch (e) {
    console.error(e);
  }
  return result;
};

export const buildSiteMap = async () =>
  sm.createSitemap({
    hostname: "https://remoted.io",
    cacheTime: 600000, // 600 sec - cache purge period
    urls: await getSiteMapUrls()
  });
