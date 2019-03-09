import * as React from "react";
import { buildAbsoluteUrl } from "../lib/url";

export const JobApply: React.FunctionComponent<{
  applyUrl: string;
  permalink: string;
  onClose: () => void;
}> = props => {
  return (
    <div className="apply">
      <div className="columns is-mobile">
        <div className="column is-half">
          <a
            className="button is-primary"
            target="_blank"
            href={buildAbsoluteUrl(props.applyUrl)}
          >
            👍 Apply
          </a>
        </div>
        <div className="column">
          <a className="button is-light" href={props.permalink}>
            🔗 Permalink
          </a>
        </div>
        <div className="column">
          <a className="button is-light" onClick={props.onClose}>
            ❌ Nevermind
          </a>
        </div>
      </div>
    </div>
  );
};
