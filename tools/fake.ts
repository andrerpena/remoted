import { buildDb } from "../server/db/build-db";
import { RemotedDatabase } from "../server/db/model";
import { clearDb } from "../lib/server/db-ci-helpers";
import * as colors from "colors";
import { config } from "dotenv";
import { addCompany } from "../server/graphql/services/company-service";
import { Company } from "../graphql-types";
import { addJob } from "../server/graphql/services/job-service";

const randomTags = [
  // .NET
  "c#",
  ".net",
  "entity-framework",
  "asp.net",
  // JavaScript
  "javascript",
  "typescript",
  "es2015",
  "react",
  "angular",
  "vue",
  // Data science
  "machine-learning",
  "tensorflow",
  "matplotlib",
  "pandas",
  "python",
  // Languages
  "ruby-on-rails",
  "pascal",
  "go",
  "ruby",
  "kotlin"
];

function getRandomArrayItem(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

async function insertCompanies(db: RemotedDatabase): Promise<Company[]> {
  return await Promise.all(
    ["Github", "Zapper", "Elastic", "Auth0"].map(companyName => {
      return addCompany(db, {
        displayName: companyName,
        url: "URL"
      });
    })
  );
}

config();

buildDb()
  .then(async db => {
    await clearDb(db);

    console.log(colors.green("Inserting companies"));
    const companies = await insertCompanies(db);

    console.log(colors.green("Inserting companies"));
    for (let i = 0; i < 100; i++) {
      try {
        console.log(colors.green(`Inserting job ${i}`));
        await addJob(db, {
          title: "Software developer",
          description: "This is the best job ever",
          publishedAt: new Date().toISOString(),
          tags: [getRandomArrayItem(randomTags)],
          companyId: companies[0].id,
          url: "URL",
          source: "stackoverflow"
        });
      } catch (ex) {
        console.log("error");
        throw ex;
      }
      console.log("Person saved " + i);
    }
  })
  .then(() => {
    process.exit();
  })
  .catch(error => console.log(error));
