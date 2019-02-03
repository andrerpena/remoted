import { RemotedDatabase } from "../model";
import { insertOne } from "./db-helpers";
import { DbTag, DbTagInsert } from "../model/tag";

export function insertTag(
  db: RemotedDatabase,
  tag: DbTagInsert
): Promise<DbTag> {
  return insertOne(db.tag, tag) as Promise<DbTag>;
}

export function getTag(db: RemotedDatabase, name: string): Promise<DbTag> {
  return db.tag.findOne({ name });
}
