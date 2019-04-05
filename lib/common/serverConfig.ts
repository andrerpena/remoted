import { config as dotenv } from "dotenv";
import { readEnvVariable } from "../server/env";

dotenv();

const storageHost = readEnvVariable(
  "STORAGE_HOST",
  "https://remoted.sfo2.digitaloceanspaces.com"
);
const storageCompanyPath = readEnvVariable(
  "STORAGE_COMPANY_PATH",
  "prod/remoted/companies"
);

export interface Config {
  storageHost: string;
  storageCompanyHost: string;
}

export const serverConfig: Config = {
  storageHost: storageHost,
  storageCompanyHost: storageCompanyPath
};
