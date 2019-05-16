import { RemotedDatabase } from "../../server/db/model";

export async function clearDb(db: RemotedDatabase): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("This is not supposed to run in production");
  }

  try {
    await db.job_tag.destroy({});
    await db.job.destroy({});
    await db.tag.destroy({});
    await db.company.destroy({});
    await db.location_details.destroy({});
  } catch (ex) {
    throw new Error("Cannot clear database. Details: " + ex);
  }
}
