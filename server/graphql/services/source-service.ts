import { DbJob, DbSource, RemotedDatabase } from "../../db/model";
import { Source, UpdateSourceInput } from "../../../graphql-types";
import { whiteListedSources } from "./job-service";
import { insertDbRecord } from "../../db/services/db-helpers";

export async function updateSource(
  db: RemotedDatabase,
  sourceInput: UpdateSourceInput
) {
  // validate the source
  if (!whiteListedSources.includes(sourceInput.name)) {
    throw new Error(`Invalid source: ${sourceInput.name}`);
  }
  let dbSource = (await db.source.findOne({
    name: sourceInput.name
  })) as DbSource;
  if (!dbSource) {
    dbSource = (await insertDbRecord(db.source, {
      name: sourceInput.name
    } as DbSource)) as DbSource;
  }

  dbSource = (await db.source.save({
    ...dbSource,
    last_update_message: sourceInput.updateMessage,
    last_update_message_details: sourceInput.updateMessageDetails,
    last_updated_at: new Date()
  } as DbSource)) as DbSource;

  return getSourceFromDbSource(dbSource);
}

export function getSourceFromDbSource(dbSource: DbSource): Source | null {
  return {
    name: dbSource.name,
    lastUpdatedAt: dbSource.last_updated_at
      ? dbSource.last_updated_at.toISOString()
      : "",
    lastUpdateMessage: dbSource.last_update_message,
    lastUpdateMessageDetails: dbSource.last_update_message_details
  };
}

export async function getSourceByJobPublicId(
  db: RemotedDatabase,
  jobPublicId: string
): Promise<Source | null> {
  const dbJob = (await db.job.findOne({ public_id: jobPublicId })) as DbJob;
  const dbSource = (await db.source.findOne({
    id: dbJob.source_id
  })) as DbSource;
  return getSourceFromDbSource(dbSource);
}
