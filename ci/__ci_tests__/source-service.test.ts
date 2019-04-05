import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";
config();
import { RemotedDatabase } from "../../server/db/model";
import { clearDb } from "../../lib/server/db-ci-helpers";
import { updateSource } from "../../server/graphql/services/source-service";

let db: RemotedDatabase;

beforeAll(async () => {
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("source-service.ts", () => {
  describe("updateSource", () => {
    it("default behavior", async () => {
      const source = await updateSource(db, {
        name: "stackoverflow",
        updateMessage: "Everything is just fine"
      });
      expect(source).toEqual({
        lastUpdateMessage: "Everything is just fine",
        lastUpdateMessageDetails: null,
        lastUpdatedAt: expect.any(String),
        name: "stackoverflow"
      });
    });

    it("updating multiple times should not duplicate the source", async () => {
      let source = await updateSource(db, {
        name: "stackoverflow",
        updateMessage: "Everything is just fine"
      });
      source = await updateSource(db, {
        name: "stackoverflow",
        updateMessage: "Updated version"
      });
      expect(source).toEqual({
        lastUpdateMessage: "Updated version",
        lastUpdateMessageDetails: null,
        lastUpdatedAt: expect.any(String),
        name: "stackoverflow"
      });
      const dbSource = await db.source.find({
        name: "stackoverflow"
      });
      expect(dbSource.length).toEqual(1);
    });
  });
});
