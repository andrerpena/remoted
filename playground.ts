import { config } from "dotenv";
import { buildDb } from "./server/db/build-db";
import { searchJobs } from "./server/graphql/services/job-service";
import * as path from "path";
import * as Email from "email-templates";
import { getCompanyByJobPublicId } from "./server/graphql/services/company-service";

config();

buildDb().then(async db => {
  const jobs = await searchJobs(db, 10, 0);
  for (const job of jobs) {
    job.company = await getCompanyByJobPublicId(db, job.id);
    console.log(job.company ? job.company.imageUrl : "nevermind");
  }

  const email = new Email({
    message: {
      from: "niftylettuce@gmail.com"
    },
    // uncomment below to send emails in development/test env:
    // send: true
    transport: {
      jsonTransport: true
    },
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: path.resolve("emails/newsletter"),
        images: true
      }
    }
  });
  const emailResult = await email.send({
    template: "newsletter",
    message: {
      to: "elon@spacex.com"
    },
    locals: {
      name: "Elon",
      jobs: jobs
    }
  });

  console.log(emailResult);
});
