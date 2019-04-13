import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { FilterData } from "../lib/common/url";
import { useState } from "react";
import { IndexQuery } from "../lib/common/query-types";

export type SearchBoxProps = IndexQuery & {
  displaySearchBar: boolean;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (searchData: FilterData) => void;
};

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const [tag, setTag] = useState(props.tag);

  const getFilterHandler = (
    tag?: string,
    regionfree?: boolean,
    salary?: boolean
  ) => {
    return () => {
      console.log("filtered");
      props.onFilter({
        tag: tag,
        query: { salary, regionfree }
      });
    };
  };

  const hasAnyFilter = props.regionfree || props.salary;

  return (
    <div className="search-box">
      {props.displaySearchBar && (
        <TagSearchBox
          initialValue={tag}
          getTags={props.getTags}
          onSelectTag={setTag}
          onFilter={tag => getFilterHandler(tag)()}
        />
      )}
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            {hasAnyFilter && (
              <a className="button" onClick={getFilterHandler(tag)}>
                ❌
              </a>
            )}
            <a className="button" onClick={getFilterHandler(tag, true, true)}>
              🌏💰 Region free + Salary
            </a>
            <a className="button" onClick={getFilterHandler(tag, true)}>
              🌏 Region free
            </a>
            <a
              className="button"
              onClick={getFilterHandler(tag, undefined, true)}
            >
              💰 Salary
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  displaySearchBar: true
};
