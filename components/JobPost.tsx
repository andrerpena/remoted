import * as React from "react";
import "./JobPost.scss";
import * as Showdown from "showdown";
import { Job } from "../graphql-types";
import { timeAgo } from "../lib/time";
import { getSalaryText } from "../lib/salary";
import { getLocationText } from "../lib/location";
import { buildAbsoluteUrl } from "../lib/url";

export const ApplyPanel: React.FunctionComponent<{
  url: string;
  onClose: () => void;
}> = props => {
  return (
    <div className="apply">
      <div className="columns is-mobile">
        <div className="column is-three-fifths">
          <a
            className="button is-primary"
            target="_blank"
            href={buildAbsoluteUrl(props.url)}
          >
            👍 Apply for this job
          </a>
        </div>
        <div className="column">
          <a className="button is-light" onClick={props.onClose}>
            ❌ Nevermind
          </a>
        </div>
      </div>
    </div>
  );
};

interface JobListState {
  open: boolean;
}

export class JobPost extends React.Component<Job, JobListState> {
  converter: Showdown.Converter;

  constructor(props: Job) {
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
      title,
      descriptionHtml,
      tags,
      company,
      publishedAt,
      url
    } = this.props;
    const companyName = company ? company.displayName : "";
    const companyUrl = company ? company.imageUrl : "";

    const salaryText = getSalaryText(this.props);
    const locationText = getLocationText(this.props);

    return (
      <li className="job-post">
        <div
          className="box-white-content job-post-header"
          onClick={this.handleClick}
        >
          <div className="company-header">
            <figure className="job-post-image">
              <img src={companyUrl as string} />
            </figure>
            <span className="company-name">
              <a href="#">{companyName}</a>
            </span>
            <span className="post-info">
              Posted on Stackoverflow {timeAgo(new Date(publishedAt))} ago
            </span>
          </div>
          <div className="job-title">
            <h5 className="title is-5">{title}</h5>
          </div>
          {(salaryText || locationText) && (
            <div className="job-info">
              {salaryText && (
                <span className="info-block salary">{salaryText}</span>
              )}
              {locationText && (
                <span className="info-block location">{locationText}</span>
              )}
            </div>
          )}
          <div className="job-post-tags">
            <div className="tags left">
              {tags.map(t => (
                <span key={t} className="tag is-white">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={`job-post-extension ${this.state.open ? "open" : ""}`}>
          <ApplyPanel url={url} onClose={this.handleClick} />
          <div
            className="description markdown"
            dangerouslySetInnerHTML={{
              __html: descriptionHtml
            }}
          />
          <ApplyPanel url={url} onClose={this.handleClick} />
        </div>
      </li>
    );
  }
}
