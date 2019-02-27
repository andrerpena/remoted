import * as childProcess from "child_process";
import * as colors from "colors";

import { config } from "dotenv";
import { readEnvVariable } from "../server/lib/env";

config({ path: __dirname + "/../.env" });

const selectedCommand = readEnvVariable("COMMAND");
const dbName = readEnvVariable("PGDATABASE");

const dbTestsName = `${dbName}_tests`;
const userName = readEnvVariable("PGUSER");
const dbFile = "db/db.sql";

console.log("Starting DB Command");
console.log(`Executing ${selectedCommand}`);

let commands;
switch (selectedCommand) {
  case "create_dev_dbs":
    commands = `
        echo Creating the ${dbName} dev db
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbName}
        echo Creating the ${dbTestsName} dev db
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbTestsName}
        echo Setting up the ${dbName} dev db
        psql -f ${dbFile} -U ${userName} -d ${dbName}
        echo Setting up the ${dbName} dev db
        psql -f ${dbFile} -U ${userName} -d ${dbTestsName}
    `;
    break;
  case "drop_dev_dbs":
    commands = `
        echo Dropping the ${dbName} dev db
        dropdb --if-exists -U ${userName} ${dbName}
        echo Dropping the ${dbTestsName} dev db
        dropdb --if-exists -U ${userName} ${dbTestsName}
    `;
    break;
  case "dump_db":
    commands = `
        echo Dumping ${dbName}
        pg_dump --no-acl --no-owner -h localhost -U ${userName} ${dbName} > ${dbFile}
        `;
    break;
  case "restore_db":
    commands = `
        echo Restoring ${dbName}
        createdb -E UTF8 --lc-collate C --lc-ctype C -U ${userName} -T template0 ${dbName}
        pg_restore -U ${userName} -d ${dbName} ${dbName}.dump
        `;
    break;
  default:
    throw new Error(`Invalid command. Command: ${selectedCommand}`);
}

commands.split("\n").forEach((command: string) => {
  const processedCommand = command.trim();
  if (processedCommand) {
    console.log(colors.green(processedCommand));
    childProcess.execSync(processedCommand);
  }
});
