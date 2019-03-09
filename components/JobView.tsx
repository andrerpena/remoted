import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/salary";
import { getLocationText } from "../lib/location";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";

export interface JobViewProps {
  job: Job;
}

export const JobView = (props: JobViewProps) => {
  if (!props.job) {
    return <div>Not found</div>;
  }
  const {
    id,
    title,
    descriptionHtml,
    tags,
    company,
    publishedAt,
    url
  } = props.job;
  const companyName = company ? company.displayName : "";
  const companyUrl = company ? company.imageUrl : "";

  const salaryText = getSalaryText(props.job);
  const locationText = getLocationText(props.job);
  return (
    <div className="job-view box-white-content">
      <div className="job-view-header">
        <CompanyHeader
          companyName={companyName}
          companyUrl={companyUrl || ""}
          publishedAt={publishedAt}
        />
        <div className="job-title">
          <h5 className="title is-5">{title}</h5>
        </div>
        <JobInfo salaryText={salaryText} locationText={locationText} />
        <JobTags tags={tags} />
      </div>
      <JobDescription html={descriptionHtml} />
    </div>
  );
};
