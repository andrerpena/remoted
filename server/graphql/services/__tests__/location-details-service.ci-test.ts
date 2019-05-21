import { buildTestDb } from "../../../db/build-db";

import { config } from "dotenv";

config();

import { addCompany } from "../company-service";
import { addJob } from "../job-service";
import { RemotedDatabase } from "../../../db/model";
import { clearDb } from "../../../../lib/server/db-ci-helpers";
import {
  getLocationDetailsForCompany,
  getLocationDetailsForJob
} from "../location-details-service";
import { LocationDetails } from "../../../../graphql-types";
import { Region } from "../../../../lib/common/location";

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
      const job = await addJob(db, {
        title: `awesome dev job`,
        description: "This is a job",
        publishedAt: new Date().toISOString(),
        companyId: companyPublicId,
        tags: ["react"],
        url: `URL`,
        source: "stackoverflow",
        locationDetails: {
          description: "germany please",
          acceptedRegions: [europe],
          acceptedCountries: ["US"],
          timeZoneMin: -5,
          timeZoneMax: 2
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
        acceptedCountries: ["US"],
        acceptedRegions: ["Europe"],
        description: "germany please",
        headquartersLocation: null,
        timeZoneMax: 2,
        timeZoneMin: -5,
        worldwideConfirmed: null
      } as LocationDetails);

      const companyLocation = await getLocationDetailsForCompany(
        db,
        companyPublicId
      );
      expect(companyLocation).toEqual({
        acceptedCountries: ["US"],
        acceptedRegions: ["Europe"],
        description: "germany please",
        headquartersLocation: null,
        timeZoneMax: 2,
        timeZoneMin: -5,
        worldwideConfirmed: null
      } as LocationDetails);
    });
  });
});
