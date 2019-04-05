import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";

config();
import { addJob } from "../../server/graphql/services/job-service";
import { RemotedDatabase } from "../../server/db/model";
import { clearDb } from "../../lib/server/db-ci-helpers";
import { addCompany } from "../../server/graphql/services/company-service";
import { getTags } from "../../server/graphql/services/tag-service";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("tag-service", () => {
  describe("getTags", () => {
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1",
        url: "URL"
      });
      for (let i = 0; i < 20; i++) {
        const tags = i < 15 ? ["react", "javascript"] : ["typescript"];
        await addJob(db, {
          title: `dev job ${i}`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: company.id,
          tags: tags,
          url: `URL_${i}`,
          source: "stackoverflow"
        });
      }
    });
    it("should work with the react tags", async () => {
      const x = await getTags(db, "react");
      expect(x).toEqual([{ count: "15", name: "react" }]);
    });
    it("should work with the typescript tags", async () => {
      const x = await getTags(db, "typescript");
      expect(x).toEqual([{ count: "5", name: "typescript" }]);
    });
    it("should work with partial names", async () => {
      const x = await getTags(db, "typescr");
      expect(x).toEqual([{ count: "5", name: "typescript" }]);
    });
    it("should return all when you pass nothing", async () => {
      const x = await getTags(db, "");
      expect(x).toEqual([
        { count: "15", name: "javascript" },
        { count: "15", name: "react" },
        { count: "5", name: "typescript" }
      ]);
    });
  });
});
