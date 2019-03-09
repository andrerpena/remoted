import * as React from "react";

export class JobTags extends React.Component<{ tags: string[] }> {
  render() {
    return (
      <div className="job-post-tags">
        <div className="tags left">
          {this.props.tags.map(t => (
            <span key={t} className="tag is-white">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
