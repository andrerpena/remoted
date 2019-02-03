import { RemotedDatabase } from "../server/db/model";

export async function clearDb(db: RemotedDatabase): Promise<void> {
  await db.job_tags.destroy({});
  await db.job.destroy({});
  await db.company.destroy({});
}
