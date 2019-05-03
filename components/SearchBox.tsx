import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { IndexQuery } from "../lib/common/query-types";
import * as classNames from "classnames";
import { MouseEventHandler } from "react";
import { FilterQuery } from "../lib/common/url";

export type SearchBoxProps = {
  displaySearchBar: boolean;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (filterQuery: FilterQuery) => void;
  query: IndexQuery;
};

const activeButtonClass = "is-light";

export const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
  displaySearchBar,
  getTags,
  onFilter,
  query
}: SearchBoxProps) => {
  const {
    company,
    filters,
    anywhere,
    salary,
    nousonly,
    nonorthamericaonly,
    noeuropeonly,
    stackoverflow,
    authenticjobs,
    weworkremotely,
    tag
  } = query;

  const filterData: FilterQuery = {
    company,
    filters,
    tag,
    anywhere: anywhere,
    salary,
    nousonly,
    nonorthamericaonly,
    noeuropeonly,
    stackoverflow,
    authenticjobs,
    weworkremotely
  };

  const handleFilterChange = (newFilterData: Partial<FilterQuery>) => {
    onFilter({ ...filterData, ...newFilterData });
  };

  const handleDisplayFilterChange = (newFilterData: Partial<FilterQuery>) => {
    if (!newFilterData.filters) {
      onFilter({
        tag,
        anywhere: anywhere,
        salary,
        filters: newFilterData.filters
      });
    } else {
      onFilter({ ...filterData, ...newFilterData });
    }
  };

  // @ts-ignore
  return (
    <div className="search-box">
      {displaySearchBar && (
        <TagSearchBox
          initialValue={tag}
          getTags={getTags}
          onSelectTag={() => {}}
          onFilter={tag => handleFilterChange({ tag })}
        />
      )}
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            {/* Basic filters */}
            <SearchButton
              active={anywhere}
              onClick={() => {
                const newValue = !anywhere;
                handleFilterChange({
                  anywhere: newValue,
                  noeuropeonly: newValue ? false : undefined,
                  noukonly: newValue ? false : undefined,
                  nonorthamericaonly: newValue ? false : undefined,
                  nousonly: newValue ? false : undefined
                });
              }}
              text="🌐 Work Anywhere"
            />
            <SearchButton
              active={salary}
              onClick={() => {
                // setSalary(!salary);
                handleFilterChange({ salary: !salary });
              }}
              text="💰 With Salary"
            />
            {/* Sources */}
            <SearchButton
              hidden={!filters}
              active={stackoverflow}
              onClick={() => {
                // setStackoverflow(!stackoverflow);
                handleFilterChange({ stackoverflow: !stackoverflow });
              }}
              text="🔖 StackOverflow"
            />
            <SearchButton
              hidden={!filters}
              active={authenticjobs}
              onClick={() => {
                // setAuthenticJobs(!authenticjobs);
                handleFilterChange({ authenticjobs: !authenticjobs });
              }}
              text="🔖 Authentic Jobs"
            />
            <SearchButton
              hidden={!filters}
              active={weworkremotely}
              onClick={() => {
                // setWeWorkRemotely(!weworkremotely);
                handleFilterChange({ weworkremotely: !weworkremotely });
              }}
              text="🔖 We Work Remotely"
            />
            {/* Regions */}
            <SearchButton
              hidden={!filters}
              active={nousonly}
              onClick={() => {
                const newValue = !nousonly;
                handleFilterChange({
                  nousonly: newValue,
                  anywhere: newValue ? false : undefined
                });
              }}
              text={'🌎 No "US only"'}
            />
            <SearchButton
              hidden={!filters}
              active={nonorthamericaonly}
              onClick={() => {
                const newValue = !nonorthamericaonly;
                handleFilterChange({
                  nonorthamericaonly: newValue,
                  anywhere: newValue ? false : undefined
                });
              }}
              text={'🌎 No "North America only"'}
            />
            <SearchButton
              hidden={!filters}
              active={noeuropeonly}
              onClick={() => {
                const newValue = !noeuropeonly;
                handleFilterChange({
                  noeuropeonly: newValue,
                  anywhere: newValue ? false : undefined
                });
              }}
              text={'🌍 No "Europe only"'}
            />
          </div>
          <div className="show-more-filters-wrapper">
            <div
              className="show-more-filters"
              onClick={() => handleDisplayFilterChange({ filters: !filters })}
            >
              <i
                className={`fas ${!filters ? "fa-plus more" : "fa-times less"}`}
              />{" "}
              {!filters ? "More filters" : "Less filters"}
            </div>
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
  active?: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  hidden?: boolean;
}

const SearchButton: React.FunctionComponent<SearchButtonProps> = props => {
  return props.hidden ? null : (
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
