import { config as dotenv } from "dotenv";
import { readEnvVariable } from "../server/lib/env";

dotenv();

const storageHost = readEnvVariable("STORAGE_HOST");
const storageCompanyPath = readEnvVariable("STORAGE_COMPANY_PATH");

export interface Config {
  storageHost: string;
  storageCompanyHost: string;
}

export const serverConfig: Config = {
  storageHost: storageHost,
  storageCompanyHost: storageCompanyPath
};
