import * as React from "react";
import "./JobPost.scss";
import * as Showdown from "showdown";
import { Job } from "../graphql-types";
import { timeAgo } from "../lib/time";

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
    const { title, descriptionHtml, tags, company, publishedAt } = this.props;
    const companyName = company ? company.displayName : "";
    const companyUrl = company ? company.imageUrl : "";

    return (
      <li className="job-post" onClick={this.handleClick}>
        <div className="box-white-content job-post-header">
          <div className="company-header">
            <figure className="job-post-image">
              <img src={companyUrl as string} />
            </figure>
            <span className="company-name">
              <a href="#">{companyName}</a>
            </span>
            <span className="post-info">
              · Posted on Stackoverflow {timeAgo(new Date(publishedAt))} ago
            </span>
          </div>
          <div className="job-title">
            <h5 className="title is-5">{title}</h5>
          </div>
          <div className="job-post-tags">
            <div className="tags left">
              {tags.map(t => (
                <span key={t} className="tag is-white">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/*<div className="job-post-body">*/}
          {/*<div>*/}
          {/*<h5 className="title is-5">{title}</h5>*/}
          {/*</div>*/}
          {/*<div className="job-post-body-more-info">*/}
          {/*${companyName} · 2d ago*/}
          {/*</div>*/}

          {/*<div className="tags right">*/}
          {/*<span className="tag save is-light">*/}
          {/*save as <i className="far fa-heart" />*/}
          {/*</span>*/}
          {/*<span className="tag apply is-light">*/}
          {/*apply <i className="fas fa-check" />*/}
          {/*</span>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
        <div className={`job-post-extension ${this.state.open ? "open" : ""}`}>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: descriptionHtml
            }}
          />
        </div>
      </li>
    );
  }
}
