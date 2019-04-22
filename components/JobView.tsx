import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/common/salary";
import { getLocationText } from "../lib/common/location";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { getSourceDisplayName } from "../lib/common/sources";
import { JobApply } from "./JobApply";

export interface JobViewProps {
  job: Job;
}

export const JobView = ({ job }: JobViewProps) => {
  if (!job) {
    return <div>Not found</div>;
  }
  const {
    title,
    descriptionHtml,
    tags,
    company,
    publishedAt,
    source,
    url
  } = job;
  const companyName = company ? company.displayName : "";
  const companyUrl = company ? company.imageUrl : "";
  const postedOn = source ? getSourceDisplayName(source) : "";

  const salaryText = getSalaryText(job);
  const locationText = getLocationText(job);
  return (
    <div className="job-view box-white-content">
      <div className="job-view-header">
        <CompanyHeader
          companyName={companyName}
          companyImageUrl20x20={companyUrl || ""}
          publishedAt={publishedAt}
          postedOn={postedOn}
          companyId={job.company ? job.company.id : ""}
        />
        <div className="job-title">
          <h3 className="title is-3">{title}</h3>
        </div>
        <JobInfo salaryText={salaryText} locationPreferred={locationText} />
        <JobTags tags={tags} />
        <JobApply applyUrl={url} permalink={"/"} hideSecondaryButtons={true} />
      </div>
      <JobDescription html={descriptionHtml} />
      <JobApply applyUrl={url} permalink={"/"} hideSecondaryButtons={true} />
    </div>
  );
};
