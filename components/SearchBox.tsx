import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { FilterData } from "../lib/common/url";
import { useState } from "react";
import { IndexQuery } from "../lib/common/query-types";
import * as classNames from "classnames";
import { MouseEventHandler } from "react";

export type SearchBoxProps = IndexQuery & {
  displaySearchBar: boolean;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (searchData: FilterData) => void;
};

const activeButtonClass = "is-primary";

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const [tag, setTag] = useState(props.tag || "");
  const [regionfree, setRegionfree] = useState(props.regionfree || false);
  const [salary, setSalary] = useState(props.salary || false);

  const handleFilterChange = (
    tag?: string,
    regionfree?: boolean,
    salary?: boolean
  ) => {
    setTag(tag || "");
    setRegionfree(regionfree || false);
    setSalary(salary || false);
    props.onFilter({
      tag: tag,
      query: {
        salary: salary || undefined,
        regionfree: regionfree || undefined
      }
    });
  };

  const hasAnyFilter = regionfree || salary;

  return (
    <div className="search-box">
      {props.displaySearchBar && (
        <TagSearchBox
          initialValue={tag}
          getTags={props.getTags}
          onSelectTag={setTag}
          onFilter={tag => handleFilterChange(tag, regionfree, salary)}
        />
      )}
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            {hasAnyFilter && (
              <a
                className="button active clear"
                onClick={() => handleFilterChange(tag)}
              >
                ❌
              </a>
            )}
            <SearchButton
              active={regionfree}
              onClick={() => handleFilterChange(tag, !regionfree, salary)}
              text="🌏 Region free"
            />
            <SearchButton
              active={salary}
              onClick={() => handleFilterChange(tag, regionfree, !salary)}
              text="💰 Salary"
            />
            <a className="button">➕</a>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchBox.defaultProps = {
  displaySearchBar: true
};

interface SearchButtonProps {
  text: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const SearchButton: React.FunctionComponent<SearchButtonProps> = props => {
  return (
    <a
      className={classNames("button", {
        [activeButtonClass]: props.active
      })}
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};
