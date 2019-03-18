import * as React from "react";
import { TagCountGroup } from "../graphql-types";
import { TagBox } from "./TagBox";

export interface TagBoxListProps {
  tagGroups: TagCountGroup[];
}

export const TagBoxList = (props: TagBoxListProps) => (
  <>
    {props.tagGroups.map(tg => {
      return <TagBox tagGroup={tg} />;
    })}
  </>
);
