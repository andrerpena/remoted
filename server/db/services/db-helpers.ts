import { AnyObject, Writable } from "massive";

export async function insertDbRecord(
  writable: Writable,
  object: AnyObject
): Promise<AnyObject> {
  const result = await writable.insert([object]);
  if (!result || result.length === 0) {
    throw new Error(`Error inserting data: ` + JSON.stringify(object, null, 4));
  }
  return result[0];
}
