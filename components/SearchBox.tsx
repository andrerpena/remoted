import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { IndexQuery } from "../lib/common/query-types";
import * as classNames from "classnames";
import { MouseEventHandler } from "react";
import { FilterQuery } from "../lib/common/url";

export type SearchBoxProps = IndexQuery & {
  displaySearchBar: boolean;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (filterQuery: FilterQuery) => void;
};

const activeButtonClass = "is-primary";

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const {
    filters,
    anywhere,
    salary,
    nousonly,
    nonorthamericaonly,
    noukonly,
    noeuropeonly,
    stackoverflow,
    authenticjobs,
    weworkremotely,
    tag,
    onFilter
  } = props;

  const filterData: FilterQuery = {
    filters,
    tag,
    anywhere: anywhere,
    salary,
    nousonly,
    nonorthamericaonly,
    noukonly,
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
      {props.displaySearchBar && (
        <TagSearchBox
          initialValue={tag}
          getTags={props.getTags}
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
                handleFilterChange({ anywhere: !anywhere });
              }}
              text="🌐 Anywhere"
            />
            <SearchButton
              active={salary}
              onClick={() => {
                // setSalary(!salary);
                handleFilterChange({ salary: !salary });
              }}
              text="💰 Salary"
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
                // setNoUsOnly(!nousonly);
                handleFilterChange({ nousonly: !nousonly });
              }}
              text="🌎 No US only"
            />
            <SearchButton
              hidden={!filters}
              active={nonorthamericaonly}
              onClick={() => {
                // setNoNorthAmericaOnly(!nonorthamericaonly);
                handleFilterChange({ nonorthamericaonly: !nonorthamericaonly });
              }}
              text="🌎 No North America only"
            />
            <SearchButton
              hidden={!filters}
              active={noukonly}
              onClick={() => {
                // setNoUkOnly(!noukonly);
                handleFilterChange({ noukonly: !noukonly });
              }}
              text="🌍 No UK only"
            />
            <SearchButton
              hidden={!filters}
              active={noeuropeonly}
              onClick={() => {
                // setNoEuropeOnly(!noeuropeonly);
                handleFilterChange({ noeuropeonly: !noeuropeonly });
              }}
              text="🌍 No Europe only"
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
