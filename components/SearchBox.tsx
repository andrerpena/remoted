import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { FilterData } from "../lib/common/url";
import { useState } from "react";
import { IndexQuery } from "../lib/common/query-types";
import * as classNames from "classnames";

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
        query: {
          salary: salary || undefined,
          regionfree: regionfree || undefined
        }
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
          onFilter={tag =>
            getFilterHandler(tag, props.regionfree, props.salary)()
          }
        />
      )}
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            {hasAnyFilter && (
              <a className="button active" onClick={getFilterHandler(tag)}>
                ❌
              </a>
            )}
            <a
              className={classNames("button", { active: props.regionfree })}
              onClick={getFilterHandler(tag, !props.regionfree, props.salary)}
            >
              🌏 Region free
            </a>
            <a
              className={classNames("button", { active: props.salary })}
              onClick={getFilterHandler(tag, props.regionfree, !props.salary)}
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
