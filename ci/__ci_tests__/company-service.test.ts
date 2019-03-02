import { buildTestDb } from "../../server/db/build-db";
import { config } from "dotenv";

config();
import { RemotedDatabase } from "../../server/db/model";
import {
  getCompany,
  addCompany,
  getCompanyUrls
} from "../../server/graphql/services/company-service";
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
  });
  describe("getCompany", () => {
    it("should work with id", async () => {
      const company = await addCompany(db, {
        displayName: "This is my company",
        url: "SOME_URL"
      });
      const companyRetrieved = await getCompany(db, company.id);
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
