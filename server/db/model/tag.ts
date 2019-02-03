import { PartialBy } from "../../../lib/type-helpers";

export interface DbTag {
  id: number;
  name: string;
  relevance: number;
}

export type DbTagInsert = PartialBy<DbTag, "id">;
