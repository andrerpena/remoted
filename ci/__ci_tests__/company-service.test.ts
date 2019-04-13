import { buildTestDb } from "../../server/db/build-db";
import { config } from "dotenv";

config();
import { DbCompany, RemotedDatabase } from "../../server/db/model";
import {
  addCompany,
  getCompanyByDisplayName,
  getCompanyByPublicId,
  getCompanyUrls
} from "../../server/graphql/services/company-service";
import { clearDb } from "../../lib/server/db-ci-helpers";

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
        displayName: "This is my company",
        url: "SOME_URL"
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
        displayName: "This is my company",
        url: "SOME_URL"
      });
      await addCompany(db, {
        displayName: "This is my company",
        url: "SOME_URL_2"
      });
      await addCompany(db, {
        displayName: "Another company",
        url: "SOME_URL_3"
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
        displayName: "This is my company",
        url: "SOME_URL"
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
        displayName: "This is my company",
        url: "SOME_URL"
      });
      const companyRetrieved = await getCompanyByDisplayName(
        db,
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
  describe("getCompanyUrls", () => {
    it("should work", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company",
        url: "SOME_URL"
      });
      const urls = await getCompanyUrls(db, company.id);
      expect(urls).toEqual(["SOME_URL"]);
    });
  });
});
