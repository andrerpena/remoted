import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";

config();
import { RemotedDatabase } from "../../server/db/model";
import { addCompany } from "../../server/graphql/services/company-service";
import {
  getJobs,
  addJob,
  getJob
} from "../../server/graphql/services/job-service";
import { clearDb } from "../../lib/server/db-ci-helpers";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("job-service", () => {
  describe("addJob", () => {
    it("default behavior", async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      const job = await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      expect(job).toMatchObject({
        createdAt: expect.any(String),
        description: "hello us only",
        descriptionHtml: "<p>hello us only</p>",
        id: expect.any(String),
        locationPreferred: null,
        locationPreferredTimeZone: null,
        locationPreferredTimeZoneTolerance: null,
        locationRaw: null,
        locationRequired: null,
        locationTag: "us-only",
        publishedAt: expect.any(String),
        salaryCurrency: null,
        salaryEquity: null,
        salaryExact: null,
        salaryMax: null,
        salaryMin: null,
        salaryRaw: null,
        tags: ["react"],
        title: "developer",
        url: "URL"
      });
      // tag
      const jobTags = await db.query("select * from job_tag");
      expect(jobTags.length).toEqual(1);
      const tags = await db.query("select * from tag");
      expect(tags.length).toEqual(1);
      expect(tags[0]).toEqual(
        expect.objectContaining({
          name: "react"
        })
      );
    });
    it("add the same job twice with the same URL should not end with 2 jobs", async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      await addJob(db, {
        title: "developer",
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      await addJob(db, {
        title: "developer-2",
        description: "hello-2",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      const data = await getJobs(db, 10, 0);
      expect(data.length).toBe(1);
      expect(data[0]).toMatchObject({
        title: "developer",
        description: "hello"
      });
    });
    it("should normalize the URL", async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      const job = await addJob(db, {
        title: "developer",
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url:
          "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig?a=1jz2mYJONKs8&so=p&pg=1&offset=-1&total=349&r=true",
        source: "stackoverflow"
      });
      if (!job) {
        throw new Error("job was not supposed to be null");
      }
      expect(job.url).toEqual(
        "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig"
      );
      const existingJob = await getJob(db, job.id);
      if (!existingJob) {
        throw new Error("existingJob was not supposed to be null");
      }
      expect(existingJob.url).toEqual(
        "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig"
      );
    });
  });
  describe("getJobs", () => {
    let companyPublicId = "";
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      companyPublicId = company.id;
      for (let i = 0; i < 10; i++) {
        await addJob(db, {
          title: `dev job ${i}`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: company.id,
          tags: ["react"],
          url: `URL_${i}`,
          source: "stackoverflow"
        });
      }
    });

    it("default behavior", async () => {
      const data = await getJobs(db, 10, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
      expect(data[0]).toMatchObject({
        createdAt: expect.any(String),
        description: "This is a job",
        descriptionHtml: "<p>This is a job</p>",
        id: expect.any(String),
        locationPreferred: null,
        locationPreferredTimeZone: null,
        locationPreferredTimeZoneTolerance: null,
        locationRaw: null,
        locationRequired: null,
        publishedAt: expect.any(String),
        salaryCurrency: null,
        salaryEquity: null,
        salaryExact: null,
        salaryMax: null,
        salaryMin: null,
        salaryRaw: null,
        tags: ["react"],
        title: "dev job 9",
        url: "URL_9"
      });
    });

    it("getting more data should return just 10", async () => {
      const data = await getJobs(db, 20, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
    });

    it("should work with half of the data", async () => {
      const data = await getJobs(db, 10, 5);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);
    });

    it("the job title should be correct", async () => {
      const data = await getJobs(db, 10, 8);
      expect(Array.isArray(data)).toBe(true);
      expect(data.map(d => d.title)).toEqual(["dev job 1", "dev job 0"]);
    });

    it("should work when you specify the tag", async () => {
      const data = await getJobs(db, 10, 0);
      expect(data.length).toEqual(10);

      const data2 = await getJobs(db, 10, 0, "tag-that-does-not-exist");
      expect(data2.length).toEqual(0);
    });

    it("should work US is excluded", async () => {
      const data = await getJobs(db, 10, 0, null, true);
      expect(data.length).toEqual(10);

      await addJob(db, {
        title: `dev job`,
        description: "This is a job",
        publishedAt: new Date().toISOString(),
        companyId: companyPublicId,
        tags: ["react"],
        url: `URL`,
        source: "stackoverflow"
      });
    });
  });
  describe("getJob", () => {
    it("should work", async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      const insertedJob = await addJob(db, {
        title: `dev job 1`,
        description: "This is a job",
        publishedAt: new Date().toISOString(),
        companyId: company.id,
        tags: ["react"],
        url: `URL`,
        source: "stackoverflow"
      });
      const id = insertedJob!.id;
      console.log(id);
      const job = await getJob(db, id);
      expect(job).toMatchObject({
        description: "This is a job",
        descriptionHtml: "<p>This is a job</p>",
        tags: ["react"],
        title: "dev job 1",
        url: "URL"
      });
    });
  });
});
