import { buildTestDb } from "../../server/massive/build-db";

import { config } from "dotenv";
import { DevjoblistDatabase } from "../../server/massive/model";

let db: DevjoblistDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

describe("something", () => {
  it("aa", async () => {
    const x = await db.job.insert({
      title: "a"
    });
    expect(x).toBe({});
  });
});
