import * as React from "react";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/salary";
import { getLocationText } from "../lib/location";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { getSourceDisplayName } from "../lib/sources";
import { JobApply } from "./JobApply";

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
    source,
    url
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
          <h3 className="title is-3">{title}</h3>
        </div>
        <JobInfo salaryText={salaryText} locationText={locationText} />
        <JobTags tags={tags} />
        <JobApply applyUrl={url} permalink={"/"} />
      </div>
      <JobDescription html={descriptionHtml} />
      <JobApply applyUrl={url} permalink={"/"} buttonClass="is-primary" />
    </div>
  );
};
