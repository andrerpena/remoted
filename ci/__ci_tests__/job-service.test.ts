import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { RemotedDatabase } from "../../server/db/model";
import { clearDb } from "../../server/lib/db-ci-helpers";
import { addCompany } from "../../server/graphql/services/company-service";
import { getJobs, addJob } from "../../server/graphql/services/job-service";
import { Job } from "../../graphql-types";

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
        urlReference: "URL"
      });
      const job = await addJob(db, {
        title: "developer",
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        urlReference: "URL"
      });
      console.log(job!.createdAt.toString());
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
          relativeUrl: "",
          salaryCurrency: null,
          salaryEquity: null,
          salaryExact: null,
          salaryMax: null,
          salaryMin: null,
          salaryRaw: null,
          tags: [],
          title: "developer"
        })
      );
    });
  });
  describe("getJobs", () => {
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        urlReference: "URL"
      });
      for (let i = 0; i < 10; i++) {
        await addJob(db, {
          title: `dev job ${i}`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: company.id,
          tags: ["react"],
          urlReference: "URL"
        });
      }
    });

    function testResultFormat(data: Job[]) {
      expect(data).toContainEqual(
        expect.objectContaining({
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
          relativeUrl: "",
          salaryCurrency: null,
          salaryEquity: null,
          salaryExact: null,
          salaryMax: null,
          salaryMin: null,
          salaryRaw: null,
          tags: [""],
          title: expect.any(String)
        })
      );
    }

    it("default behavior", async () => {
      const data = await getJobs(db, 10, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
      testResultFormat(data);
    });

    it("getting more data should return just 10", async () => {
      const data = await getJobs(db, 20, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
      testResultFormat(data);
    });

    it("should work with half of the data", async () => {
      const data = await getJobs(db, 10, 5);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);
      testResultFormat(data);
    });

    it("the job title should be correct", async () => {
      const data = await getJobs(db, 10, 8);
      expect(Array.isArray(data)).toBe(true);
      expect(data.map(d => d.title)).toEqual(["dev job 1", "dev job 0"]);
    });
  });
});
