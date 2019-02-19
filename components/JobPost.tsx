import { Job } from "../server/graphql/model";
import * as React from "react";
import "./JobPost.scss";
import { getSampleMarkdown } from "../lib/markdown-helpers";
import * as Showdown from "showdown";

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
    return (
      <li className="job-post" onClick={this.handleClick}>
        <div className="box-white-content job-post-header">
          <figure className="job-post-image">
            <img src="https://ph-files.imgix.net/9196e189-287f-4381-ad38-f8b422b90789?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2%202x,%20https://ph-files.imgix.net/9196e189-287f-4381-ad38-f8b422b90789?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=3%203x" />
          </figure>
          <div className="job-post-body">
            <div>
              <h5 className="title is-5">{this.props.title}</h5>
            </div>
            <div className="job-post-body-more-info">Microsoft · 2d ago</div>
            <div className="job-post-tags">
              <div className="tags left">
                <span className="tag is-white">Primary</span>
                <span className="tag is-white">asp.net</span>
                <span className="tag is-white">css</span>
                <span className="tag is-white">html</span>
              </div>
              <div className="tags right">
                <span className="tag save is-light">
                  save as <i className="far fa-heart" />
                </span>
                <span className="tag apply is-light">
                  apply <i className="fas fa-check" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`job-post-extension ${this.state.open ? "open" : ""}`}>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: this.converter.makeHtml(getSampleMarkdown())
            }}
          />
        </div>
      </li>
    );
  }
}
