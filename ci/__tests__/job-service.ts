import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { RemotedDatabase } from "../../server/db/model";
import { getJobs, insertJob } from "../../server/db/services/job-service";
import { insertCompany } from "../../server/db/services/company-service";
import { DbGetJobsReturnType } from "../../server/db/model/job";
import { clearDb } from "../db-ci-helpers";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("job-service", () => {
  describe("insertJob", () => {
    it("default behavior", async () => {
      const company = await insertCompany(db, {
        name: "c-1",
        display_name: "c-1"
      });
      const jobCreationDate = new Date();
      const job = await insertJob(db, {
        title: "developer",
        created_at: jobCreationDate,
        published_at: jobCreationDate,
        company_id: company.id,
        tags: ["react"]
      });
      expect(job).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          public_id: expect.any(String),
          title: "developer"
        })
      );
    });
  });
  describe("getJobs", () => {
    beforeEach(async () => {
      const company = await insertCompany(db, {
        name: "c-1",
        display_name: "c-1"
      });
      for (let i = 0; i < 10; i++) {
        const jobCreationDate = new Date();
        await insertJob(db, {
          title: `dev job ${i}`,
          created_at: jobCreationDate,
          published_at: jobCreationDate,
          company_id: company.id,
          tags: ["react"]
        });
      }
    });

    function testResultFormat(data: DbGetJobsReturnType[]) {
      expect(data).toContainEqual(
        expect.objectContaining({
          public_id: expect.any(String),
          title: expect.stringContaining("dev job"),
          created_at: expect.any(Date),
          published_at: expect.any(Date)
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
