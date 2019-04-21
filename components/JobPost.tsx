import * as React from "react";
import "./JobPost.scss";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/common/salary";
import { getLocationText } from "../lib/common/location";
import { linkToJob, linkToJobCanonical } from "../lib/common/url";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { JobApply } from "./JobApply";
import { SingletonRouter } from "next/router";
import Link from "next/link";
import { getSourceDisplayName } from "../lib/common/sources";
import * as classNames from "classnames";

interface JobListState {
  open: boolean;
}

interface JobPostProps {
  job: Job;
  router?: SingletonRouter;
}

export class JobPost extends React.Component<JobPostProps, JobListState> {
  constructor(props: JobPostProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOnClose = () => {
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
      locationTag,
      url,
      source
    } = this.props.job;
    const companyName = company ? company.displayName : "";
    const companyImageUrl20x20 = company ? company.imageUrl20x20 : "";

    const salaryText = getSalaryText(this.props.job);
    const locationText = getLocationText(this.props.job);

    const postedOn = source ? getSourceDisplayName(this.props.job.source) : "";

    return (
      <li className="job-post">
        <div
          className={classNames("box-white-content", "job-post-header", {
            open: this.state.open
          })}
          onClick={this.handleOnClose}
        >
          <CompanyHeader
            companyName={companyName}
            companyImageUrl20x20={companyImageUrl20x20 || ""}
            publishedAt={publishedAt}
            postedOn={postedOn}
          />
          <div className="job-title">
            <Link href={linkToJob(id)} as={linkToJobCanonical(id)}>
              <a className="title is-5" onClick={e => e.stopPropagation()}>
                {title}
              </a>
            </Link>
          </div>
          <JobInfo
            salaryText={salaryText}
            locationPreferred={locationText}
            locationTag={locationTag}
          />
          <JobTags tags={tags} />
        </div>
        <div
          className={`job-post-extension box-white-content ${
            this.state.open ? "open" : ""
          }`}
        >
          <JobApply
            applyUrl={url}
            permalink={linkToJob(id)}
            hideSecondaryButtons={true}
            onClose={() => this.handleOnClose()}
          />
          <JobDescription html={descriptionHtml} />
          <JobApply
            applyUrl={url}
            permalink={linkToJob(id)}
            onClose={() => this.handleOnClose()}
          />
        </div>
      </li>
    );
  }
}
