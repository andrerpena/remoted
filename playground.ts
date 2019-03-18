import { config } from "dotenv";

config();
import { buildDb } from "./server/db/build-db";

buildDb().then(async db => {
  const tags = await db.getTagsIncluding({
    tags: "{reactjs, css, javascript}"
  });
  console.log(tags);
});
