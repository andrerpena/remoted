import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
import { RemotedDatabase } from "../../server/db/model";
import { insertCompany } from "../../server/db/services/company-service";
import { clearDb } from "../../lib/db-ci-helpers";

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
        name: "c-1",
        display_name: "c-1"
      });
      expect(company).toEqual(
        expect.objectContaining({
          name: "c-1",
          primary_address: null,
          public_id: expect.any(String)
        })
      );
    });
  });
});
