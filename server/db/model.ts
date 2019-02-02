import * as massive from "massive";
import { AnyObject } from "massive";
import { UUID } from "massive";
import { RetrievalOptions } from "massive";
import { ResultProcessingOptions } from "massive";
import { PersistenceInsertOptions } from "massive";

export interface TypedEntity<T extends AnyObject<any>>
  extends massive.Writable {
  find(
    criteria?: AnyObject | number | UUID,
    options?: RetrievalOptions & ResultProcessingOptions
  ): Promise<Array<T>>;

  insert(
    data: T[],
    options?: PersistenceInsertOptions & ResultProcessingOptions
  ): Promise<T[]>;
}

export interface DbJob extends AnyObject<any> {
  id?: number;
  public_id?: string;
  title: string;
  created_at: Date;
  published_at: Date;
}

export interface DbGetJobsReturnType {
  id: number;
  public_id: string;
  title: string;
}

export interface RemotedDatabase extends massive.Database {
  _remoted_get_jobs: (
    limit: number,
    offset: number
  ) => Promise<DbGetJobsReturnType[]>;
  job: TypedEntity<DbJob>;
}
