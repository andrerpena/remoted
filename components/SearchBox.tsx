import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { FilterData } from "../lib/common/url";
import { useState } from "react";

export interface SearchBoxProps {
  tag: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (searchData: FilterData) => void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const [tag, setTag] = useState(props.tag);

  const getClickHandler = (regionFree?: boolean, salary?: boolean) => {
    return () => {
      props.onFilter({
        tag: tag,
        query: {
          salary: salary,
          "region-free": regionFree
        }
      });
    };
  };

  return (
    <div className="search-box">
      <TagSearchBox
        initialValue={tag}
        getTags={props.getTags}
        onSelectTag={setTag}
      />
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            <a className="button" onClick={getClickHandler(true, true)}>
              🌏💰 Region free + Salary
            </a>
            <a className="button" onClick={getClickHandler(true)}>
              🌏 Region free
            </a>
            <a className="button" onClick={getClickHandler(undefined, true)}>
              💰 Salary
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
