import * as React from "react";
import { TagCountGroup } from "../graphql-types";

export interface TagBoxProps {
  tagGroup: TagCountGroup;
}

export const TagBox = (props: TagBoxProps) => (
  <div className="tag-box box-white">
    <div className="box-white-header">
      <h6 className="title is-6">{props.tagGroup.name}</h6>
    </div>
    <div className="box-white-content field is-grouped is-grouped-multiline">
      {props.tagGroup.tags
        ? props.tagGroup.tags.map(t => (
            <div className="control">
              <div className="tags has-addons">
                <span className="tag is-white">{t.name}</span>
                <span className="tag is-light">{t.count}</span>
              </div>
            </div>
          ))
        : []}
    </div>
  </div>
);
