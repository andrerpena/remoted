import * as React from "react";
import { timeAgo } from "../lib/common/time";
import { linkToCompanyCanonical, linkToFilters } from "../lib/common/url";
import Link from "next/link";

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
      <span>
        <Link
          href={linkToFilters({ company: companyId })}
          as={linkToCompanyCanonical({ company: companyId })}
        >
          <a className="a-wrapper" onClick={e => e.stopPropagation()}>
            {companyImageUrl20x20 && (
              <figure className="job-post-image">
                <img src={companyImageUrl20x20 as string} alt="" />
              </figure>
            )}
            <span className="company-name">{companyName}</span>
          </a>
        </Link>
      </span>
      <span className="post-info">
        Posted on {postedOn} {timeAgo(new Date(publishedAt))} ago
      </span>
    </div>
  );
};
