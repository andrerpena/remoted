import * as massive from "massive";
import { readConfig } from "../config";
import { RemotedDatabase } from "./model";
import * as monitor from "pg-monitor";

let db: Promise<RemotedDatabase>;
let testDb: Promise<RemotedDatabase>;

export async function buildDb(): Promise<RemotedDatabase> {
  if (db) return db;
  return (db = massive(readConfig().connection) as Promise<RemotedDatabase>);
}

export async function buildTestDb(): Promise<RemotedDatabase> {
  if (testDb) return testDb;
  testDb = massive(readConfig().testConnection) as Promise<RemotedDatabase>;
  const result = await testDb;
  // Uncomment to activate monitoring
  monitor.attach(result.driverConfig);
  return result;
}
