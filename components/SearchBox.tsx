import * as React from "react";
import { TagOption, TagSearchBox } from "./TagSearchBox";
import { Checkbox } from "./Checkbox";
import { CheckBoxFilterBox } from "./CheckBoxFilterBox";

export interface SearchBoxProps {
  tag: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onSelectTag: (tag: string) => void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (
  props: SearchBoxProps
) => {
  const [open, setOpen] = React.useState(false);
  // sources
  const [stackoverflow, toggleStackoverflow] = React.useState(true);
  const [weWorkRemotely, toggleWeWorkRemotely] = React.useState(true);

  // location
  const [us, toggleUs] = React.useState(true);
  const [northAmerica, toggleNorthAmerica] = React.useState(true);
  const [uk, toggleUk] = React.useState(true);

  // Compensation
  const [withoutCompensation, toggleWithoutCompensation] = React.useState(true);

  return (
    <div className="search-box">
      <TagSearchBox
        initialValue={props.tag}
        getTags={props.getTags}
        onSelectTag={props.onSelectTag}
      />
      <div className="show-more-filters-wrapper">
        <div className="show-more-filters" onClick={() => setOpen(!open)}>
          <i className={`fas ${!open ? "fa-arrow-down" : "fa-arrow-up"}`} />{" "}
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
                    id="us"
                    label="US only"
                    checked={us}
                    onChange={toggleUs}
                  />
                  <Checkbox
                    id="northamerica"
                    label="North America only"
                    checked={northAmerica}
                    onChange={toggleNorthAmerica}
                  />
                  <Checkbox
                    id="uk"
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
                <div className="filter-box-title" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
