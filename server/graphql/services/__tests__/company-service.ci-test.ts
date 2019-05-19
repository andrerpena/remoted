import { buildTestDb } from "../../../db/build-db";
import { config } from "dotenv";

config();
import { DbCompany, RemotedDatabase } from "../../../db/model";
import {
  addCompany,
  getCompanyByDisplayName,
  getCompanyByPublicId
} from "../company-service";
import { clearDb } from "../../../../lib/server/db-ci-helpers";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("company-service", () => {
  describe("addCompany", () => {
    it("default behavior", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company"
      });
      expect(company).toEqual(
        expect.objectContaining({
          displayName: "This is my company",
          id: expect.any(String),
          name: "this-is-my-company"
        })
      );
    });
    it("should work for multiple companies with the same ID (this will change)", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company"
      });
      await addCompany(db, {
        displayName: "This is my company"
      });
      await addCompany(db, {
        displayName: "Another company"
      });
      const result = await db.company.find({
        display_name: company.displayName
      } as DbCompany);
      expect(result.length).toEqual(1);
    });
  });
  describe("getCompanyByPublicId", () => {
    it("should work", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company"
      });
      const companyRetrieved = await getCompanyByPublicId(db, company.id);
      expect(companyRetrieved).toEqual(
        expect.objectContaining({
          displayName: "This is my company",
          id: expect.any(String),
          name: "this-is-my-company"
        })
      );
    });
  });
  describe("getCompanyByDisplayName", () => {
    it("should work when the company exists", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company"
      });
      const companyRetrieved = await getCompanyByDisplayName(
        db,
        null,
        company.displayName
      );
      expect(companyRetrieved).toEqual(
        expect.objectContaining({
          displayName: "This is my company",
          id: expect.any(String),
          name: "this-is-my-company"
        })
      );
    });
  });
});
