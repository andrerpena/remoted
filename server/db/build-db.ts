import * as massive from "massive";
import { readConfig } from "../config";
import { RemotedDatabase } from "./model";
import * as monitor from "pg-monitor";

let db: RemotedDatabase;
let testDb: RemotedDatabase;

export async function buildDb(): Promise<RemotedDatabase> {
  if (db) return db;
  db = (await massive(readConfig().connection)) as RemotedDatabase;
  return db;
}

export async function buildTestDb(): Promise<RemotedDatabase> {
  if (testDb) return testDb;
  testDb = (await massive(readConfig().testConnection)) as RemotedDatabase;
  // Uncomment to activate monitoring
  monitor.attach(testDb.driverConfig);
  return testDb;
}
