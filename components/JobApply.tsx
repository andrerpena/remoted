import * as React from "react";
import * as classNames from "classnames";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  permalink: string;
  hideSecondaryButtons?: boolean;
  onClose?: () => void;
}> = ({ applyUrl, permalink, hideSecondaryButtons, onClose }) => {
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
              <a className={`button`} href={permalink}>
                🔗 Permalink
              </a>
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
