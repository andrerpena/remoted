import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/common/salary";
import { getLocationTagDisplay } from "../lib/common/location";

export function JobDetails({ job }: { job: Job }) {
  const salaryText = getSalaryText(job);

  return (
    <>
      {(salaryText ||
        job.locationPreferred ||
        job.locationRequired ||
        job.locationTag) && (
        <div className="job-info">
          {salaryText && (
            <span className="info-block salary">{salaryText}</span>
          )}
          {job.locationTag && (
            <span className="info-block location">
              Required: {getLocationTagDisplay(job.locationTag)}
            </span>
          )}
          {job.locationRequired && !job.locationTag && (
            <span className="info-block location">
              Required: {job.locationRequired}
            </span>
          )}
        </div>
      )}
    </>
  );
}
