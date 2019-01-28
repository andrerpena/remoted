import * as massive from "massive";
import { readConfig } from "../config";
import { DevjoblistDatabase } from "./model";

let db: Promise<DevjoblistDatabase>;
let testDb: Promise<DevjoblistDatabase>;

export async function buildDb(): Promise<DevjoblistDatabase> {
  if (db) return db;
  db = massive(readConfig().connection) as Promise<DevjoblistDatabase>;
  return db;
}

export async function buildTestDb(): Promise<DevjoblistDatabase> {
  if (testDb) return testDb;
  testDb = massive(readConfig().testConnection) as Promise<DevjoblistDatabase>;
  return testDb;
}
