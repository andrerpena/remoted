import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/common/salary";
import { isJobPostTooOld } from "../lib/common/job-post-utils";
import {
  getAcceptedLocationText,
  getTimezoneText
} from "../lib/common/location";

export function JobDetails({ job }: { job: Job }) {
  const salaryText = getSalaryText(job);
  const isPostTooOld = isJobPostTooOld(new Date(job.publishedAt));
  return (
    <>
      {(salaryText || job.locationDetails || isPostTooOld) && (
        <div className="job-info">
          {isPostTooOld && (
            <span className="info-block not-available">
              PROBABLY NO LONGER AVAILABLE.
            </span>
          )}
          {salaryText && (
            <span className="info-block salary">{salaryText}.</span>
          )}
          {job.locationDetails &&
            (job.locationDetails.acceptedCountries ||
              job.locationDetails.acceptedRegions) && (
              <span className="info-block">
                Must be located:{" "}
                {getAcceptedLocationText(
                  job.locationDetails.acceptedCountries,
                  job.locationDetails.acceptedRegions
                )}
                .
              </span>
            )}
          {job.locationDetails &&
            (job.locationDetails.timeZoneMin ||
              job.locationDetails.timeZoneMax) && (
              <span className="info-block location">
                Preferred timezone:{" "}
                {getTimezoneText(
                  job.locationDetails.timeZoneMin,
                  job.locationDetails.timeZoneMax
                )}
              </span>
            )}
        </div>
      )}
    </>
  );
}
