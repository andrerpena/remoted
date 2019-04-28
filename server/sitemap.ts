// @ts-ignore
import * as sm from "sitemap";
import { buildDb } from "./db/build-db";
import { config } from "dotenv";
import { linkToJobCanonical } from "../lib/common/url";

config();

const getSiteMapUrls = async () => {
  try {
    const db = await buildDb();
    const jobs = await db.getJobsSourceMaps();
    const urls = jobs.map(j => ({
      url: linkToJobCanonical(j.public_id),
      changefreq: "daily",
      priotity: 0.7
    }));
    console.log(urls);
    return urls;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const buildSiteMap = async () =>
  sm.createSitemap({
    hostname: "https://remoted.io",
    cacheTime: 600000, // 600 sec - cache purge period
    urls: await getSiteMapUrls()
  });
