import { buildDb } from "../server/db/build-db";
import { insertCompany } from "../server/db/services/company-service";
import { RemotedDatabase } from "../server/db/model";
import { DbCompany } from "../server/db/model/company";
import { clearDb } from "../lib/db-ci-helpers";
import { insertJob } from "../server/db/services/job-service";
import * as colors from "colors";
import { config } from "dotenv";

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

async function insertCompanies(db: RemotedDatabase): Promise<DbCompany[]> {
  return await Promise.all(
    ["Github", "Zapper", "Elastic", "Auth0"].map(companyName => {
      return insertCompany(db, {
        name: companyName.toLowerCase(),
        display_name: companyName
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
        const date = new Date();
        await insertJob(db, {
          title: "Software developer",
          company_id: companies[0].id,
          tags: [getRandomArrayItem(randomTags)],
          created_at: date,
          published_at: date
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