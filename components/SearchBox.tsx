import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";

export interface SearchBoxProps {
  tag: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onSelectTag: (tag: string) => void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  return (
    <div className="search-box">
      <TagSearchBox
        initialValue={props.tag}
        getTags={props.getTags}
        onSelectTag={props.onSelectTag}
      />
    </div>
  );
};
