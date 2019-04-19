import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { useState } from "react";
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
  const [tag, setTag] = useState(props.tag || "");

  // filters - default
  const [regionfree, setRegionfree] = useState(props.regionfree || false);
  const [salary, setSalary] = useState(props.salary || false);

  // filters - region
  const [nousonly, setNoUsOnly] = useState(props.nousonly || false);
  const [nonorthamericaonly, setNoNorthAmericaOnly] = useState(
    props.nonorthamericaonly || false
  );
  const [noukonly, setNoUkOnly] = useState(props.noukonly || false);
  const [noeuropeonly, setNoEuropeOnly] = useState(props.noeuropeonly || false);

  // filters - origin
  const [stackoverflow, setStackoverflow] = useState(
    props.stackoverflow || false
  );
  const [authenticjobs, setAuthenticJobs] = useState(
    props.authenticjobs || false
  );
  const [weworkremotely, setWeWorkRemotely] = useState(
    props.weworkremotely || false
  );

  const [moreFilters, setMoreFilters] = useState(false);

  const filterData: FilterQuery = {
    tag,
    regionfree,
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
    props.onFilter({ ...filterData, ...newFilterData });
  };

  const hasAnyFilter = regionfree || salary;

  // @ts-ignore
  return (
    <div className="search-box">
      {props.displaySearchBar && (
        <TagSearchBox
          initialValue={tag}
          getTags={props.getTags}
          onSelectTag={setTag}
          onFilter={tag => handleFilterChange({ tag })}
        />
      )}
      <div className="show-more-filters-wrapper">
        <div className="filter-box-wrapper">
          <div className="buttons-wrapper">
            <SearchButton
              hidden={!hasAnyFilter}
              onClick={() => handleFilterChange({ tag })}
              text="❌"
            />
            {/* Basic filters */}
            <SearchButton
              active={regionfree}
              onClick={() => {
                setRegionfree(!regionfree);
                handleFilterChange({ regionfree: !regionfree });
              }}
              text="🔓 Region free"
            />
            <SearchButton
              active={salary}
              onClick={() => {
                setSalary(!salary);
                handleFilterChange({ salary: !salary });
              }}
              text="💰 Salary"
            />
            {/* Sources */}
            <SearchButton
              hidden={!moreFilters}
              active={stackoverflow}
              onClick={() => {
                setStackoverflow(!stackoverflow);
                handleFilterChange({ stackoverflow: !stackoverflow });
              }}
              text="🔖 StackOverflow"
            />
            <SearchButton
              hidden={!moreFilters}
              active={authenticjobs}
              onClick={() => {
                setAuthenticJobs(!authenticjobs);
                handleFilterChange({ authenticjobs: !authenticjobs });
              }}
              text="🔖 Authentic Jobs"
            />
            <SearchButton
              hidden={!moreFilters}
              active={weworkremotely}
              onClick={() => {
                setWeWorkRemotely(!weworkremotely);
                handleFilterChange({ weworkremotely: !weworkremotely });
              }}
              text="🔖 We Work Remotely"
            />
            {/* Regions */}
            <SearchButton
              hidden={!moreFilters}
              active={nousonly}
              onClick={() => {
                setNoUsOnly(!nousonly);
                handleFilterChange({ nousonly: !nousonly });
              }}
              text="🌎 No US only"
            />
            <SearchButton
              hidden={!moreFilters}
              active={nonorthamericaonly}
              onClick={() => {
                setNoNorthAmericaOnly(!nonorthamericaonly);
                handleFilterChange({ nonorthamericaonly: !nonorthamericaonly });
              }}
              text="🌎 No North America only"
            />
            <SearchButton
              hidden={!moreFilters}
              active={noukonly}
              onClick={() => {
                setNoUkOnly(!noukonly);
                handleFilterChange({ noukonly: !noukonly });
              }}
              text="🌍 No UK only"
            />
            <SearchButton
              hidden={!moreFilters}
              active={noeuropeonly}
              onClick={() => {
                setNoEuropeOnly(!noeuropeonly);
                handleFilterChange({ noeuropeonly: !noeuropeonly });
              }}
              text="🌍 No Europe only"
            />
            <SearchButton
              onClick={() => setMoreFilters(!moreFilters)}
              text={moreFilters ? "➖" : "➕"}
            />
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
