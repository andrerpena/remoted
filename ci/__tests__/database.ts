import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { DbGetJobsReturnType, RemotedDatabase } from "../../server/db/model";
import { getJobs, insertJob } from "../../server/db/services/job-service";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

describe("job-service", () => {
  describe("insertJob", () => {
    it("default behavior", async () => {
      const jobs = await insertJob(db, {
        title: "developer"
      });
      expect(Array.isArray(jobs)).toBe(true);
      expect(jobs.length).toBe(1);
      expect(jobs[0]).toEqual(
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
      await db.job.destroy({});
      for (let i = 0; i < 10; i++) {
        await insertJob(db, {
          title: `dev job ${i}`
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
