import { config } from "dotenv";
import { buildDb } from "./server/db/build-db";
import { searchJobs } from "./server/graphql/services/job-service";
import * as path from "path";
import * as Email from "email-templates";

config();

buildDb().then(async db => {
  const jobs = await searchJobs(db, 10, 0);
  console.log(jobs);

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
      jobs: [1, 2, 3, 4, 5]
    }
  });

  console.log(emailResult);
});
