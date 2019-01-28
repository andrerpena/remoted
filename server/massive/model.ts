import * as massive from "massive";
import { AnyObject } from "massive";
import { UUID } from "massive";
import { RetrievalOptions } from "massive";
import { ResultProcessingOptions } from "massive";
import { PersistenceInsertOptions } from "massive";

export interface TypedEntity<T> extends massive.Writable {
  find(
    criteria?: AnyObject | number | UUID,
    options?: RetrievalOptions & ResultProcessingOptions
  ): Promise<Array<T>>;
  insert(
    data: AnyObject,
    options?: PersistenceInsertOptions & ResultProcessingOptions
  ): Promise<T>;
}

export interface Job {
  id: string;
}

export interface DevjoblistDatabase extends massive.Database {
  job: TypedEntity<Job>;
}
