import * as React from "react";
import { Nullable } from "../lib/common/types";

export function JobInfo(props: {
  salaryText?: Nullable<string>;
  locationPreferred?: Nullable<string>;
  locationTag?: Nullable<string>;
}) {
  return (
    <>
      {(props.salaryText || props.locationPreferred || props.locationTag) && (
        <div className="job-info">
          {props.salaryText && (
            <span className="info-block salary">{props.salaryText}</span>
          )}
          {props.locationPreferred && (
            <span className="info-block location">
              {props.locationPreferred}
            </span>
          )}
          {props.locationTag && (
            <span className="info-block location-tag">{props.locationTag}</span>
          )}
        </div>
      )}
    </>
  );
}
