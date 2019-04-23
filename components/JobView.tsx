import * as React from "react";
import { Job } from "../graphql-types";
import { CompanyHeader } from "./CompanyHeader";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { getSourceDisplayName } from "../lib/common/sources";
import { JobApply } from "./JobApply";
import { JobDetails } from "./JobDetails";

export interface JobViewProps {
  job: Job;
}

export const JobView = ({ job }: JobViewProps) => {
  if (!job) {
    return <div>Not found</div>;
  }
  const {
    id,
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
        <JobDetails job={job} />
        <JobTags tags={tags} />
        <JobApply applyUrl={url} jobId={id} hideSecondaryButtons={true} />
      </div>
      <JobDescription html={descriptionHtml} />
      <JobApply applyUrl={url} jobId={id} hideSecondaryButtons={true} />
    </div>
  );
};
