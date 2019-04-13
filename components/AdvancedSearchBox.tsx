import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { Checkbox } from "./Checkbox";
import { CheckBoxFilterBox } from "./CheckBoxFilterBox";
import {
  EUROPE_ONLY,
  NORTH_AMERICA_ONLY,
  UK_ONLY,
  US_ONLY
} from "../lib/common/location";
import { FilterData } from "../lib/common/url";
import { STACKOVERFLOW, WE_WORK_REMOTELY } from "../lib/common/sources";

export interface AdvancedSearchBoxProps {
  tag: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (searchData: FilterData) => void;
}

export const AdvancedSearchBox: React.FunctionComponent<
  AdvancedSearchBoxProps
> = (props: AdvancedSearchBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState(props.tag || "");

  // sources
  const [stackoverflow, toggleStackoverflow] = React.useState(true);
  const [weWorkRemotely, toggleWeWorkRemotely] = React.useState(true);

  // location
  const [usOnly, toggleUs] = React.useState(true);
  const [northAmericaOnly, toggleNorthAmerica] = React.useState(true);
  const [europeOnly, toggleEurope] = React.useState(true);
  const [ukOnly, toggleUk] = React.useState(true);

  // Compensation
  const [noSalary, toggleNoSalary] = React.useState(true);

  const onSelectTag = (tag: string) => {
    setTag(tag);
    if (!open) {
      applyFilters(tag);
    }
  };

  const applyFilters = (_tag: string = tag) => {
    const filterData = buildFilterData(_tag);
    props.onFilter(filterData);
  };

  const buildFilterData: (tag: string) => FilterData = (tag: string) => {
    return {
      tag: tag,
      query: {
        // sources
        [STACKOVERFLOW]: stackoverflow,
        [WE_WORK_REMOTELY]: weWorkRemotely,
        // location
        [US_ONLY]: usOnly,
        [NORTH_AMERICA_ONLY]: northAmericaOnly,
        [UK_ONLY]: ukOnly,
        [EUROPE_ONLY]: europeOnly
      }
    };
  };

  return (
    <div className="search-box">
      <TagSearchBox
        initialValue={tag}
        getTags={props.getTags}
        onSelectTag={onSelectTag}
        onFilter={onSelectTag}
      />
      <div className="show-more-filters-wrapper">
        <div className="show-more-filters" onClick={() => setOpen(!open)}>
          <i className={`fas ${!open ? "fa-arrow-down" : "fa-arrow-up"}`} />{" "}
          {!open ? "More filters" : "Less filters"}
        </div>
        {open && (
          <div className="advanced-filter-box-wrapper">
            <div className="columns">
              <div className="column is-one-third">
                <CheckBoxFilterBox title="🔭 Sources">
                  <Checkbox
                    id="stackoverflow"
                    label="Stackoverflow"
                    checked={stackoverflow}
                    onChange={toggleStackoverflow}
                  />
                  <Checkbox
                    id="weworkremotely"
                    label="WeWorkRemotely"
                    checked={weWorkRemotely}
                    onChange={toggleWeWorkRemotely}
                  />
                </CheckBoxFilterBox>
              </div>
              <div className="column is-one-third">
                <CheckBoxFilterBox title="🌏 Location">
                  <Checkbox
                    id={US_ONLY}
                    label="US only"
                    checked={usOnly}
                    onChange={toggleUs}
                  />
                  <Checkbox
                    id={NORTH_AMERICA_ONLY}
                    label="North America only"
                    checked={northAmericaOnly}
                    onChange={toggleNorthAmerica}
                  />
                  <Checkbox
                    id={UK_ONLY}
                    label="UK only"
                    checked={ukOnly}
                    onChange={toggleUk}
                  />
                  <Checkbox
                    id={EUROPE_ONLY}
                    label="Europe only"
                    checked={europeOnly}
                    onChange={toggleEurope}
                  />
                </CheckBoxFilterBox>
              </div>
              <div className="column is-one-third">
                <CheckBoxFilterBox title="💰 Salary">
                  <Checkbox
                    id="compensation"
                    label="Unknown salary"
                    checked={noSalary}
                    onChange={toggleNoSalary}
                  />
                </CheckBoxFilterBox>
              </div>
              <div className="filter-box">
                <div className="filter-box-title" />
              </div>
            </div>
            <div className="button-bar">
              <a className="button is-primary">
                <i className="fas fa-search" onClick={() => applyFilters()} />{" "}
                Apply filters
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
