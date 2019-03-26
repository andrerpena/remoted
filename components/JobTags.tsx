import * as React from "react";
import Link from "next/link";
import { linkToTag } from "../lib/url";

export class JobTags extends React.Component<{ tags: string[] }> {
  render() {
    return (
      <div className="job-post-tags">
        <div className="tags left">
          {this.props.tags.map(t => (
            <Link href={linkToTag(t.toLowerCase())}>
              <a
                key={t}
                className="tag is-white"
                onClick={e => e.stopPropagation()}
              >
                {t}
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
