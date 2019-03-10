import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/salary";
import { getLocationText } from "../lib/location";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { getSourceDisplayName } from "../lib/sources";

export interface JobViewProps {
  job: Job;
}

export const JobView = (props: JobViewProps) => {
  if (!props.job) {
    return <div>Not found</div>;
  }
  const {
    title,
    descriptionHtml,
    tags,
    company,
    publishedAt,
    source
  } = props.job;
  const companyName = company ? company.displayName : "";
  const companyUrl = company ? company.imageUrl : "";
  const postedOn = source ? getSourceDisplayName(source.name) : "";

  const salaryText = getSalaryText(props.job);
  const locationText = getLocationText(props.job);
  return (
    <div className="job-view box-white-content">
      <div className="job-view-header">
        <CompanyHeader
          companyName={companyName}
          companyUrl={companyUrl || ""}
          publishedAt={publishedAt}
          postedOn={postedOn}
        />
        <div className="job-title">
          <h4 className="title is-4">{title}</h4>
        </div>
        <JobInfo salaryText={salaryText} locationText={locationText} />
        <JobTags tags={tags} />
      </div>
      <JobDescription html={descriptionHtml} />
    </div>
  );
};
