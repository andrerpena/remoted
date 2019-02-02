import * as massive from "massive";
import { readConfig } from "../config";
import { RemotedDatabase } from "./model";

let db: Promise<RemotedDatabase>;
let testDb: Promise<RemotedDatabase>;

export async function buildDb(): Promise<RemotedDatabase> {
  if (db) return db;
  db = massive(readConfig().connection) as Promise<RemotedDatabase>;
  return db;
}

export async function buildTestDb(): Promise<RemotedDatabase> {
  if (testDb) return testDb;
  testDb = massive(readConfig().testConnection) as Promise<RemotedDatabase>;
  return testDb;
}
