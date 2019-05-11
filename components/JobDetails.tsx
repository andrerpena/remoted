import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/common/salary";
import { isJobPostTooOld } from "../lib/common/job-post-utils";

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
          {/*{job.locationTag && (*/}
          {/*  <span className="info-block">*/}
          {/*    Required: {getLocationTagDisplay(job.locationTag)}.*/}
          {/*  </span>*/}
          {/*)}*/}
          {/*{job.locationRequired && !job.locationTag && (*/}
          {/*  <span className="info-block location">*/}
          {/*    Required: {job.locationRequired}.*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
      )}
    </>
  );
}
