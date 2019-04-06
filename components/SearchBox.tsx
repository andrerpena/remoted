import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { Checkbox } from "./Checkbox";
import { CheckBoxFilterBox } from "./CheckBoxFilterBox";
import { EUROPE_ONLY, NORTH_AMERICA_ONLY, UK_ONLY, US_ONLY } from "../lib/common/location";
import { FilterData } from "../lib/common/url";

export interface SearchBoxProps {
  tag: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onFilter: (searchData: FilterData) => void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const [open, setOpen] = React.useState(false);
  const [tag, setTag] = React.useState(props.tag || "");

  // sources
  const [stackoverflow, toggleStackoverflow] = React.useState(true);
  const [weWorkRemotely, toggleWeWorkRemotely] = React.useState(true);

  // location
  const [us, toggleUs] = React.useState(true);
  const [northAmerica, toggleNorthAmerica] = React.useState(true);
  const [europe, toggleEurope] = React.useState(true);
  const [uk, toggleUk] = React.useState(true);

  // Compensation
  const [withoutCompensation, toggleWithoutCompensation] = React.useState(true);

  const onSelectTag = (tag: string) => {
    setTag(tag);
    if (!open) {
      onFilter(tag);
    }
  };

  const onFilter = (tag: string) => {
    const filterData = buildFilterData(tag);
    props.onFilter(filterData);
  };

  const buildFilterData: (tag: string) => FilterData = (tag: string) => {
    return {
      tag: tag,
      excludeSources: [],
      excludeLocations: [
        !us ? US_ONLY : null,
        !northAmerica ? NORTH_AMERICA_ONLY : null,
        !europe ? EUROPE_ONLY : null,
        !uk ? UK_ONLY : null
      ]
    };
  };

  return (
    <div className="search-box">
      <TagSearchBox
        initialValue={tag}
        getTags={props.getTags}
        onSelectTag={onSelectTag}
      />
      <div className="show-more-filters-wrapper">
        <div className="show-more-filters" onClick={() => setOpen(!open)}>
          <i className={`fas ${!open ? "fa-arrow-down" : "fa-arrow-up"}`}/>{" "}
          More filters
        </div>
        {open && (
          <div className="filter-box-wrapper">
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
                    checked={us}
                    onChange={toggleUs}
                  />
                  <Checkbox
                    id={NORTH_AMERICA_ONLY}
                    label="North America only"
                    checked={northAmerica}
                    onChange={toggleNorthAmerica}
                  />
                  <Checkbox
                    id={EUROPE_ONLY}
                    label="Europe only"
                    checked={europe}
                    onChange={toggleEurope}
                  />
                  <Checkbox
                    id={UK_ONLY}
                    label="UK only"
                    checked={uk}
                    onChange={toggleUk}
                  />
                </CheckBoxFilterBox>
              </div>
              <div className="column is-one-third">
                <CheckBoxFilterBox title="💰 Salary">
                  <Checkbox
                    id="compensation"
                    label="Unknown salary"
                    checked={withoutCompensation}
                    onChange={toggleWithoutCompensation}
                  />
                </CheckBoxFilterBox>
              </div>
              <div className="filter-box">
                <div className="filter-box-title"/>
              </div>
            </div>
            <div className="button-bar">
              <a className="button is-primary">
                <i className="fas fa-search"/> Apply filters
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
