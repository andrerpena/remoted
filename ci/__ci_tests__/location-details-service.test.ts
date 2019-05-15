import { buildTestDb } from "../../server/db/build-db";

import { config } from "dotenv";

config();

import { addCompany } from "../../server/graphql/services/company-service";
import { addJob } from "../../server/graphql/services/job-service";
import { RemotedDatabase } from "../../server/db/model";
import { clearDb } from "../../lib/server/db-ci-helpers";
import { Region } from "../../server/locations";
import {
  getLocationDetailsForCompany,
  getLocationDetailsForJob
} from "../../server/graphql/services/location-details-service";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("Location details service", () => {
  describe("getLocationDetailsForJob", () => {
    let companyPublicId = "";
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      // this is me writing some code! =D
      companyPublicId = company.id;
    });
    it("should work happy case", async () => {
      const europe: Region = "Europe";
      const america: Region = "Americas";
      const job = await addJob(db, {
        title: `awesome dev job`,
        description: "This is a job",
        publishedAt: new Date().toISOString(),
        companyId: companyPublicId,
        tags: ["react"],
        url: `URL`,
        source: "stackoverflow",
        locationDetails: {
          raw: "germany please",
          preferredRegions: [europe],
          preferredCountries: ["DE"],
          preferredTimeZoneMin: 0,
          preferredTimeZoneMax: 2,
          requiredRegions: [europe, america],
          requiredCountries: ["DE", "FR"],
          requiredTimeZoneMin: -1,
          requiredTimeZoneMax: 3,
          worldwide: false
        }
      });

      if (!job) {
        throw new Error("job should not be null");
      }

      expect(job).toMatchObject({
        createdAt: expect.any(String),
        description: "This is a job",
        descriptionHtml: "<p>This is a job</p>",
        id: expect.any(String),
        publishedAt: expect.any(String),
        salaryCurrency: null,
        salaryEquity: null,
        salaryExact: null,
        salaryMax: null,
        salaryMin: null,
        salaryRaw: null,
        source: "stackoverflow",
        tags: ["react"],
        title: "awesome dev job",
        url: "URL"
      });

      const locationDetails = await getLocationDetailsForJob(db, job.id);
      expect(locationDetails).toEqual({
        preferredCountries: ["DE"],
        preferredRegions: ["Europe"],
        preferredTimeZoneMax: 2,
        preferredTimeZoneMin: 0,
        raw: "germany please",
        requiredCountries: ["DE"],
        requiredRegions: ["Europe"],
        requiredTimeZoneMax: 2,
        requiredTimeZoneMin: 0
      });

      const companyLocation = await getLocationDetailsForCompany(
        db,
        companyPublicId
      );
      expect(companyLocation).toEqual({
        preferredCountries: ["DE"],
        preferredRegions: ["Europe"],
        preferredTimeZoneMax: 2,
        preferredTimeZoneMin: 0,
        raw: "germany please",
        requiredCountries: ["DE"],
        requiredRegions: ["Europe"],
        requiredTimeZoneMax: 2,
        requiredTimeZoneMin: 0
      });
    });
  });
});
