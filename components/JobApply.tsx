import * as React from "react";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  permalink: string;
  buttonClass?: string;
}> = props => {
  return (
    <div className="job-apply">
      <div className="columns is-mobile">
        <div className="column is-full">
          <a className={`button`} target="_blank" href={props.applyUrl}>
            🎯 Apply for this job
          </a>
        </div>
      </div>
    </div>
  );
};
