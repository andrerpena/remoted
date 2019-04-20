import * as React from "react";
import { timeAgo } from "../lib/common/time";

export interface CompanyHeaderProps {
  postedOn: string;
  companyImageUrl20x20: string;
  companyName: string;
  publishedAt: string;
}

export const CompanyHeader: React.FunctionComponent<CompanyHeaderProps> = (
  props: CompanyHeaderProps
) => {
  return (
    <div className="company-header">
      <figure className="job-post-image">
        {props.companyImageUrl20x20 && (
          <img src={props.companyImageUrl20x20 as string} />
        )}
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
