import { config as dotenv } from "dotenv";
import { readEnvVariable } from "../server/env";

dotenv();

const storageHost = readEnvVariable(
  "STORAGE_HOST",
  "https://remoted.sfo2.digitaloceanspaces.com"
);
const storageCdnHost = readEnvVariable(
  "STORAGE_CDN_HOST",
  "https://remoted.sfo2.cdn.digitaloceanspaces.com"
);
const storageCompanyPath = readEnvVariable(
  "STORAGE_COMPANY_PATH",
  "prod/remoted/companies"
);

export interface Config {
  storageHost: string;
  storageCompanyPath: string;
  storageCdnHost: string;
}

export const serverConfig: Config = {
  /**
   * The URL of the storage host. This should be used for WRITE operations.
   * Ex: https://remoted.sfo2.digitaloceanspaces.com
   */
  storageHost: storageHost,
  /**
   * The URL of the CDN. This should be used for READ operations.
   * Ex: https://remoted.sfo2.cdn.digitaloceanspaces.com
   */
  storageCdnHost: storageCdnHost,
  /**
   * The URL of the storage host for company images. Ex: prod/remoted/companies
   */
  storageCompanyPath: storageCompanyPath
};
