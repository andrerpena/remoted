import * as React from "react";
import * as classNames from "classnames";
import Link from "next/link";
import { linkToJob, linkToJobCanonical } from "../lib/common/url";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  jobId: string;
  hideSecondaryButtons?: boolean;
  onClose?: () => void;
}> = ({ applyUrl, jobId, hideSecondaryButtons, onClose }) => {
  return (
    <div className="job-apply">
      <div className="columns is-mobile">
        <div className="column is-full">
          <div className="job-actions-wrapper">
            {!hideSecondaryButtons && onClose && (
              <a
                className={`button`}
                onClick={e => {
                  e.preventDefault();
                  onClose();
                }}
              >
                ❌ Close
              </a>
            )}
            {!hideSecondaryButtons && (
              <Link href={linkToJob(jobId)} as={linkToJobCanonical(jobId)}>
                <a className={`button`}>🔗 Permalink</a>
              </Link>
            )}
            <a
              className={classNames(`button`, "is-primary")}
              target="_blank"
              href={applyUrl}
            >
              🎯 Apply for this job
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
