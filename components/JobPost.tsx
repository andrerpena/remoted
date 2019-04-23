import * as React from "react";
import "./JobPost.scss";
import { Job } from "../graphql-types";
import { linkToJob, linkToJobCanonical } from "../lib/common/url";
import { CompanyHeader } from "./CompanyHeader";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { JobApply } from "./JobApply";
import { SingletonRouter } from "next/router";
import Link from "next/link";
import { getSourceDisplayName } from "../lib/common/sources";
import * as classNames from "classnames";
import { IndexQuery } from "../lib/common/query-types";
import { JobDetails } from "./JobDetails";

interface JobListState {
  open: boolean;
}

interface JobPostProps {
  job: Job;
  router?: SingletonRouter;
  query: IndexQuery;
}

export class JobPost extends React.Component<JobPostProps, JobListState> {
  constructor(props: JobPostProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const {
      id,
      title,
      descriptionHtml,
      tags,
      company,
      publishedAt,
      url,
      source
    } = this.props.job;
    const companyName = company ? company.displayName : "";
    const companyImageUrl20x20 = company ? company.imageUrl : "";
    const companyId = company ? company.id : "";

    const postedOn = source ? getSourceDisplayName(this.props.job.source) : "";

    return (
      <li className="job-post">
        <div
          className={classNames("box-white-content", "job-post-header", {
            open: this.state.open
          })}
          onClick={this.handleToggle}
        >
          <CompanyHeader
            companyName={companyName}
            companyImageUrl20x20={companyImageUrl20x20 || ""}
            publishedAt={publishedAt}
            postedOn={postedOn}
            companyId={companyId}
          />
          <div className="job-title">
            <Link href={linkToJob(id)} as={linkToJobCanonical(id)}>
              <a
                className="title is-5"
                onClick={e => {
                  e.preventDefault();
                }}
              >
                {title}
              </a>
            </Link>
          </div>
          <JobDetails job={this.props.job} />
          <JobTags tags={tags} />
        </div>
        <div
          className={`job-post-extension box-white-content ${
            this.state.open ? "open" : ""
          }`}
        >
          <JobApply
            applyUrl={url}
            jobId={id}
            hideSecondaryButtons={true}
            onClose={() => this.handleToggle()}
          />
          <JobDescription html={descriptionHtml} />
          <JobApply
            applyUrl={url}
            jobId={id}
            onClose={() => this.handleToggle()}
          />
        </div>
      </li>
    );
  }
}
