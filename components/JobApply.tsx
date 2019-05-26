import * as React from "react";
import * as classNames from "classnames";
import Link from "next/link";
import { linkToJob, linkToJobCanonical } from "../lib/common/url";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  jobId: string;
  hideSecondaryButtons?: boolean;
}> = ({ applyUrl, jobId, hideSecondaryButtons }) => {
  return (
    <div className="job-apply">
      <div className="field has-addons">
        {!hideSecondaryButtons && (
          <p className="control">
            <Link href={linkToJob(jobId)} as={linkToJobCanonical(jobId)}>
              <a className={`button`}>🔗</a>
            </Link>
          </p>
        )}
        <p className="control">
          <a
            className={classNames(`button`, "is-primary")}
            target="_blank"
            href={applyUrl}
          >
            ⚡ Apply for this job
          </a>
        </p>
      </div>
    </div>
  );
};
