import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { RemotedDatabase } from "../../server/db/model";
import { clearDb } from "../../server/lib/db-ci-helpers";
import { addCompany } from "../../server/graphql/services/company-service";
import { getJobs, addJob } from "../../server/graphql/services/job-service";

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
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      expect(job).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          description: "hello",
          descriptionHtml: "<p>hello</p>",
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
          title: "developer",
          url: "URL"
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
  });
  describe("getJobs", () => {
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
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
      expect(data[0]).toEqual({
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
  });
});
