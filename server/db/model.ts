import * as massive from "massive";
import { Writable } from "massive";
import { DbGetJobsReturnType } from "./model/job";

export interface RemotedDatabase extends massive.Database {
  _remoted_get_jobs: (
    limit: number,
    offset: number
  ) => Promise<DbGetJobsReturnType[]>;

  job: Writable;
  company: Writable;
  stackoverflow_tags_cache: Writable;
  tag: Writable;
  job_tags: Writable;
}
