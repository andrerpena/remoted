import { buildTestDb } from "../../../db/build-db";

import { config } from "dotenv";

config();
import { DbCompany, RemotedDatabase } from "../../../db/model";
import { addCompany } from "../company-service";
import {
  searchJobs,
  addJob,
  getJob,
  updateLocationDetails
} from "../job-service";
import { clearDb } from "../../../../lib/server/db-ci-helpers";
import {
  getLocationDetailsForCompany,
  getLocationDetailsForJob
} from "../location-details-service";
import { Job } from "../../../../graphql-types";

let db: RemotedDatabase;

beforeAll(async () => {
  config();
  db = await buildTestDb();
});

beforeEach(async () => {
  return clearDb(db);
});

describe("job-service", () => {
  describe("addJob", () => {
    it("default behavior", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      const job = await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      expect(job).toMatchObject({
        createdAt: expect.any(String),
        description: "hello us only",
        descriptionHtml: "<p>hello us only</p>",
        id: expect.any(String),
        publishedAt: expect.any(String),
        salaryCurrency: null,
        salaryEquity: null,
        salaryExact: null,
        salaryMax: null,
        salaryMin: null,
        salaryRaw: null,
        tags: ["react"],
        title: "developer",
        url: "URL"
      });
      // tag
      const jobTags = await db.query("select * from job_tag");
      expect(jobTags.length).toEqual(1);
      const tags = await db.query("select * from tag");
      expect(tags.length).toEqual(1);
      expect(tags[0]).toEqual(
        expect.objectContaining({
          name: "react"
        })
      );
    });
    it("add the same job twice with the same URL should not end with 2 jobs", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      await addJob(db, {
        title: "developer",
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      await addJob(db, {
        title: "developer-2",
        description: "hello-2",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      const data = await searchJobs(db, 10, 0);
      expect(data.length).toBe(1);
      expect(data[0]).toMatchObject({
        title: "developer",
        description: "hello"
      });
    });
    it("should normalize the URL", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      const job = await addJob(db, {
        title: "developer",
        description: "hello",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url:
          "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig?a=1jz2mYJONKs8&so=p&pg=1&offset=-1&total=349&r=true",
        source: "stackoverflow"
      });
      if (!job) {
        throw new Error("job was not supposed to be null");
      }
      expect(job.url).toEqual(
        "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig"
      );
      const existingJob = await getJob(db, job.id);
      if (!existingJob) {
        throw new Error("existingJob was not supposed to be null");
      }
      expect(existingJob.url).toEqual(
        "https://stackoverflow.com/jobs/243210/open-source-engineer-falco-sysdig"
      );
    });
  });
  describe("getJob", () => {
    it("should work", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      const insertedJob = await addJob(db, {
        title: `dev job 1`,
        description: "This is a job",
        publishedAt: new Date().toISOString(),
        companyId: company.id,
        tags: ["react"],
        url: `URL`,
        source: "stackoverflow"
      });
      const id = insertedJob!.id;
      const job = await getJob(db, id);
      expect(job).toMatchObject({
        description: "This is a job",
        descriptionHtml: "<p>This is a job</p>",
        tags: ["react"],
        title: "dev job 1",
        url: "URL"
      });
    });
  });
  describe("searchJobs", () => {
    let companyPublicId = "";
    beforeEach(async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      companyPublicId = company.id;
      for (let i = 0; i < 10; i++) {
        await addJob(db, {
          title: `dev job ${i}`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: company.id,
          tags: ["react"],
          url: `URL_${i}`,
          source: "stackoverflow",
          locationDetails: {
            acceptedCountries: ["US"],
            acceptedRegions: ["North America"],
            headquartersLocation: "New York, US",
            description: "Candidates should be from the US",
            timeZoneMin: -4,
            timeZoneMax: 0
          }
        });
      }
      const dbCompany = (await db.company.findOne({
        public_id: companyPublicId
      } as Partial<DbCompany>)) as DbCompany;
      if (!dbCompany) {
        throw new Error("Company should exist");
      }
    });

    it("default behavior", async () => {
      const data = await searchJobs(db, 10, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
      console.log(data[0]);
      expect(data[0]).toMatchObject({
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
        tags: ["react"],
        title: "dev job 9",
        url: "URL_9",
        locationDetails: {
          acceptedCountries: ["US"],
          acceptedRegions: ["North America"],
          headquartersLocation: "New York, US",
          description: "Candidates should be from the US",
          timeZoneMin: -4,
          timeZoneMax: 0
        }
      });
    });

    it("getting more data should return just 10", async () => {
      const data = await searchJobs(db, 20, 0);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
    });

    it("should work with half of the data", async () => {
      const data = await searchJobs(db, 10, 5);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);
    });

    it("the job title should be correct", async () => {
      const data = await searchJobs(db, 10, 8);
      expect(Array.isArray(data)).toBe(true);
      expect(data.map(d => d.title)).toEqual(["dev job 1", "dev job 0"]);
    });

    describe("locationDetails", () => {
      it("should return nothing when excluding US", async () => {
        const data = await searchJobs(db, 10, 0, null, null, ["US"]);
        expect(data.length).toEqual(0);
      });
      it("should return nothing when excluding North America", async () => {
        const data = await searchJobs(db, 10, 0, null, null, null, [
          "North America"
        ]);
        expect(data.length).toEqual(0);
      });
      it("should return 10 if creating a job with an excluded country", async () => {
        await addJob(db, {
          title: `BR JOB`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          locationDetails: {
            acceptedCountries: ["BR"]
          },
          companyId: companyPublicId,
          tags: ["react"],
          url: `URL`,
          source: "stackoverflow"
        });
        const data = await searchJobs(db, 20, 0, null, null, ["BR"]);
        expect(data.length).toEqual(10);
        // None of them should be BR JOB
        expect(data.filter(j => j.title !== "BR JOB").length).toEqual(10);
      });
      it("should only the BR job if excluding US", async () => {
        await addJob(db, {
          title: `BR JOB`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          locationDetails: {
            acceptedCountries: ["BR"]
          },
          companyId: companyPublicId,
          tags: ["react"],
          url: `URL`,
          source: "stackoverflow"
        });
        const data = await searchJobs(db, 20, 0, null, null, ["US"]);
        expect(data.length).toEqual(1);
      });

      it("should working exclude multiple countries", async () => {
        // US-ONLY
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          locationDetails: {
            acceptedCountries: ["BR"]
          },
          companyId: companyPublicId,
          tags: ["react"],
          url: `URL-BR`,
          source: "stackoverflow"
        });

        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          locationDetails: {
            acceptedCountries: ["GB"]
          },
          companyId: companyPublicId,
          tags: ["react"],
          url: `URL-GB`,
          source: "stackoverflow"
        });

        const data = await searchJobs(db, 20, 0, null, null, ["BR", "US"]);
        expect(data.length).toEqual(1);
      });
    });

    describe("anywhere", () => {
      it("should return all jobs", async () => {
        const data = await searchJobs(db, 20, 0);
        expect(data.length).toEqual(10);
      });
    });

    describe("tag", () => {
      it("should work when only asking for react (10 were added)", async () => {
        const data = await searchJobs(db, 20, 0, "react");
        expect(data.length).toEqual(10);
      });
      it("should work when only asking for a tag with only 1 job", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "stackoverflow"
        });
        const data = await searchJobs(db, 20, 0, "angular");
        expect(data.length).toEqual(1);
      });
      it("should work when asking for a tag that does not exist", async () => {
        const data = await searchJobs(db, 20, 0, "react2");
        expect(data.length).toEqual(0);
      });
    });

    describe("salary", () => {
      it("should work when salary is not specified", async () => {
        const data = await searchJobs(db, 20, 0);
        expect(data.length).toEqual(10);
      });
      it("should work when exact salary is specified", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "stackoverflow",
          salaryExact: 10000
        });
        const data = await searchJobs(db, 20, 0, null, null, null, null, true);
        expect(data.length).toEqual(1);
      });
      it("should work when min salary is specified", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "stackoverflow",
          salaryMin: 10000
        });
        const data = await searchJobs(db, 20, 0, null, null, null, null, true);
        expect(data.length).toEqual(1);
      });
      it("should work when max salary is specified", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "stackoverflow",
          salaryMax: 10000
        });
        const data = await searchJobs(db, 20, 0, null, null, null, null, true);
        expect(data.length).toEqual(1);
      });
    });

    describe("sources", () => {
      it("should work with stackoverflow", async () => {
        const data = await searchJobs(db, 20, 0);
        expect(data.length).toEqual(10);
      });
      it("should work with we-work-remotely", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "we-work-remotely",
          salaryExact: 10000
        });
        const data = await searchJobs(db, 20, 0, null, null, null, null, null, [
          "we-work-remotely"
        ]);
        expect(data.length).toEqual(1);
      });
      it("should work with 2 sources", async () => {
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL`,
          source: "we-work-remotely",
          salaryExact: 10000
        });
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: companyPublicId,
          tags: ["angular"],
          url: `URL2`,
          source: "authentic-jobs",
          salaryExact: 10000
        });
        const data = await searchJobs(db, 20, 0, null, null, null, null, null, [
          "we-work-remotely",
          "authentic-jobs"
        ]);
        expect(data.length).toEqual(2);
      });
    });

    describe("company", () => {
      it("should work when company is specified", async () => {
        const data = await searchJobs(
          db,
          20,
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          companyPublicId
        );
        expect(data.length).toEqual(10);
      });
      it("should work when the company specified does not have any job or does not exist", async () => {
        const data = await searchJobs(
          db,
          20,
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          "non existing public id"
        );
        expect(data.length).toEqual(0);
      });
      it("should work with a newly created company", async () => {
        const dbCompany = (await db.company.save({
          public_id: "company_public_id",
          name: "my company",
          display_name: "my company"
        } as Partial<DbCompany>)) as DbCompany;
        await addJob(db, {
          title: `dev job`,
          description: "This is a job",
          publishedAt: new Date().toISOString(),
          companyId: dbCompany.public_id,
          tags: ["angular"],
          url: `URL`,
          source: "we-work-remotely",
          salaryExact: 10000
        });
        const data = await searchJobs(
          db,
          20,
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          dbCompany.public_id
        );
        expect(data.length).toEqual(1);
      });
    });
  });
  describe("updateLocationDetails", () => {
    it("should work when there is no job details", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      if (!company) {
        throw new Error("company not saved");
      }
      const job = await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      if (!job) {
        throw new Error("job not saved");
      }
      await updateLocationDetails(db, job.id, company.id, undefined);
    });
    it("should add a location description to both the job and the company", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      if (!company) {
        throw new Error("company not saved");
      }
      const job = await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow"
      });
      if (!job) {
        throw new Error("job not saved");
      }
      await updateLocationDetails(db, job.id, company.id, {
        acceptedRegions: ["North America"],
        acceptedCountries: ["US"],
        headquartersLocation: "New York",
        description: "Super good job",
        timeZoneMin: -8,
        timeZoneMax: -3
      });

      const companyLocationDetails = await getLocationDetailsForCompany(
        db,
        company.id
      );
      expect(companyLocationDetails).toEqual({
        acceptedCountries: ["US"],
        acceptedRegions: ["North America"],
        description: "Super good job",
        headquartersLocation: "New York",
        timeZoneMax: -3,
        timeZoneMin: -8,
        worldwideConfirmed: null
      });

      const jobLocationDetails = await getLocationDetailsForJob(db, job.id);
      expect(jobLocationDetails).toEqual({
        acceptedCountries: ["US"],
        acceptedRegions: ["North America"],
        description: "Super good job",
        headquartersLocation: "New York",
        timeZoneMax: -3,
        timeZoneMin: -8,
        worldwideConfirmed: null
      });
    });
    it("should update the company location details when the new is different", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      if (!company) {
        throw new Error("company not saved");
      }
      await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow",
        locationDetails: {
          acceptedRegions: ["North America"],
          acceptedCountries: ["US"],
          headquartersLocation: "New York",
          description: "Super good job",
          timeZoneMin: -8,
          timeZoneMax: -3
        }
      });

      (await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL-2",
        source: "stackoverflow",
        locationDetails: {
          acceptedRegions: ["North America"],
          acceptedCountries: ["US", "BR"],
          headquartersLocation: "New York",
          description: "Super good job",
          timeZoneMin: -8,
          timeZoneMax: -3
        }
      })) as Job;

      const companyLocationDetails = await getLocationDetailsForCompany(
        db,
        company.id
      );
      expect(companyLocationDetails).toEqual({
        acceptedCountries: ["US", "BR"],
        acceptedRegions: ["North America"],
        description: "Super good job",
        headquartersLocation: "New York",
        timeZoneMax: -3,
        timeZoneMin: -8,
        worldwideConfirmed: null
      });
    });
    it("The job should have the location details of the company if it the job does have location details but not complete", async () => {
      const company = await addCompany(db, {
        displayName: "c-1"
      });
      if (!company) {
        throw new Error("company not saved");
      }
      await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL",
        source: "stackoverflow",
        locationDetails: {
          acceptedRegions: ["North America"],
          acceptedCountries: ["US"],
          headquartersLocation: "New York",
          description: "Super good job",
          timeZoneMin: -8,
          timeZoneMax: -3
        }
      });

      const job2 = (await addJob(db, {
        title: "developer",
        description: "hello us only",
        companyId: company.id,
        publishedAt: new Date().toISOString(),
        tags: ["react"],
        url: "URL-2",
        source: "stackoverflow",
        locationDetails: {
          acceptedRegions: ["Americas"]
        }
      })) as Job;

      const companyLocationDetails = await getLocationDetailsForCompany(
        db,
        company.id
      );
      expect(companyLocationDetails).toEqual({
        acceptedCountries: ["US"],
        acceptedRegions: ["Americas"],
        description: "Super good job",
        headquartersLocation: "New York",
        timeZoneMax: -3,
        timeZoneMin: -8,
        worldwideConfirmed: null
      });

      const job2LocationDetails = await getLocationDetailsForJob(db, job2.id);
      expect(job2LocationDetails).toEqual({
        acceptedCountries: ["US"],
        acceptedRegions: ["Americas"],
        description: "Super good job",
        headquartersLocation: "New York",
        timeZoneMax: -3,
        timeZoneMin: -8,
        worldwideConfirmed: null
      });
    });
  });
});
