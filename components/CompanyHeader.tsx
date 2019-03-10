import * as React from "react";
import { timeAgo } from "../lib/time";

export interface CompanyHeaderProps {
  postedOn: string;
  companyUrl: string;
  companyName: string;
  publishedAt: string;
}

export const CompanyHeader: React.FunctionComponent<CompanyHeaderProps> = (
  props: CompanyHeaderProps
) => {
  return (
    <div className="company-header">
      <figure className="job-post-image">
        <img src={props.companyUrl as string} />
      </figure>
      <span className="company-name">
        <a href="#">{props.companyName}</a>
      </span>
      <span className="post-info">
        Posted on {props.postedOn} {timeAgo(new Date(props.publishedAt))} ago
      </span>
    </div>
  );
};
