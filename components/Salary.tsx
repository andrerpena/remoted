import * as React from "react";
import { Nullable } from "../lib/common/types";

export class JobInfo extends React.Component<{
  salaryText?: Nullable<string>;
  locationText?: Nullable<string>;
}> {
  render() {
    return (
      <>
        {(this.props.salaryText || this.props.locationText) && (
          <div className="job-info">
            {this.props.salaryText && (
              <span className="info-block salary">{this.props.salaryText}</span>
            )}
            {this.props.locationText && (
              <span className="info-block location">
                {this.props.locationText}
              </span>
            )}
          </div>
        )}
      </>
    );
  }
}
