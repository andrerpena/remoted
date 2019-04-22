import * as React from "react";
import { timeAgo } from "../lib/common/time";
import { linkToCompanyCanonical } from "../lib/common/url";

export interface CompanyHeaderProps {
  postedOn: string;
  companyImageUrl20x20: string;
  companyName: string;
  companyId: string;
  publishedAt: string;
}

export const CompanyHeader: React.FunctionComponent<CompanyHeaderProps> = ({
  postedOn,
  companyImageUrl20x20,
  companyName,
  publishedAt,
  companyId
}: CompanyHeaderProps) => {
  return (
    <div className="company-header">
      <figure className="job-post-image">
        {companyImageUrl20x20 && (
          <img src={companyImageUrl20x20 as string} alt="" />
        )}
      </figure>
      <span className="company-name">
        <a
          href={linkToCompanyCanonical({
            company: companyId
          })}
          onClick={e => e.stopPropagation()}
        >
          {companyName}
        </a>
      </span>
      <span className="post-info">
        Posted on {postedOn} {timeAgo(new Date(publishedAt))} ago
      </span>
    </div>
  );
};
