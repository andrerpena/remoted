import * as React from "react";
import "./JobPost.scss";
import * as Showdown from "showdown";
import { Job } from "../graphql-types";
import { getSalaryText } from "../lib/salary";
import { getLocationText } from "../lib/location";
import { buildRelativeJobUrl } from "../lib/url";
import { CompanyHeader } from "./CompanyHeader";
import { JobInfo } from "./Salary";
import { JobTags } from "./JobTags";
import { JobDescription } from "./JobDescription";
import { JobApply } from "./JobApply";

interface JobListState {
  open: boolean;
}

interface JobPostProps {
  job: Job;
}

export class JobPost extends React.Component<JobPostProps, JobListState> {
  converter: Showdown.Converter;

  constructor(props: JobPostProps) {
    super(props);
    this.state = {
      open: false
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleClick = () => {
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
      url
    } = this.props.job;
    const companyName = company ? company.displayName : "";
    const companyUrl = company ? company.imageUrl : "";

    const salaryText = getSalaryText(this.props.job);
    const locationText = getLocationText(this.props.job);

    return (
      <li className="job-post">
        <div
          className="box-white-content job-post-header"
          onClick={this.handleClick}
        >
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
        <div className={`job-post-extension ${this.state.open ? "open" : ""}`}>
          <JobApply
            applyUrl={url}
            permalink={buildRelativeJobUrl(id)}
            onClose={this.handleClick}
          />
          <JobDescription html={descriptionHtml} />
          <JobApply
            applyUrl={url}
            permalink={buildRelativeJobUrl(id)}
            onClose={this.handleClick}
          />
        </div>
      </li>
    );
  }
}
