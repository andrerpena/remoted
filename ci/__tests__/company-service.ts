import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { RemotedDatabase } from "../../server/db/model";
import { insertCompany } from "../../server/graphql/services/company-service";
import { clearDb } from "../../server/lib/db-ci-helpers";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("company-service", () => {
  describe("insertCompany", () => {
    it("default behavior", async () => {
      const company = await insertCompany(db, {
        displayName: "This is my company"
      });
      expect(company).toEqual(
        expect.objectContaining({
          displayName: "This is my company",
          id: expect.any(String),
          name: "this-is-my-company",
          relativeUrl: ""
        })
      );
    });
  });
});
