import * as React from "react";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  permalink: string;
  onClose: () => void;
}> = props => {
  return (
    <div className="apply">
      <div className="columns is-mobile">
        <div className="column is-full">
          <a
            className="button is-primary"
            target="_blank"
            href={props.applyUrl}
          >
            👍 Apply for this job
          </a>
        </div>
      </div>
    </div>
  );
};
