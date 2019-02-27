import { RemotedDatabase } from "../db/model";

export async function clearDb(db: RemotedDatabase): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("This is not supposed to run in production");
  }
  await db.company_url.destroy({});
  await db.job_tag.destroy({});
  await db.job.destroy({});
  await db.tag.destroy({});
  await db.company.destroy({});
}
