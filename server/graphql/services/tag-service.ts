import { RemotedDatabase } from "../../db/model";
import {
  TagCount,
  TagCountGroup,
  TagCountGroupInput
} from "../../../graphql-types";

export async function getTagCountGroups(
  db: RemotedDatabase,
  tagGroups: TagCountGroupInput[]
): Promise<TagCountGroup[] | null> {
  const result: TagCountGroup[] = [];
  for (let group of tagGroups) {
    const tags = await db.getTagsIncluding({
      tags: `{${group.tags.join(",")}}`
    });
    result.push({
      name: group.name,
      tags: tags.map((t: any) => ({ name: t.name, count: t.count }))
    });
  }
  return result;
}

export async function getTags(
  db: RemotedDatabase,
  text: string
): Promise<TagCount[]> {
  return db.getTags({ _text: text + "%" });
}
