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
    data: AnyObject,
    options?: PersistenceInsertOptions & ResultProcessingOptions
  ): Promise<T[]>;
}

export interface Job extends AnyObject<any> {
  id: string;
}

export interface RemotedDatabase extends massive.Database {
  job: TypedEntity<Job>;
}
