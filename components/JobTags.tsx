import * as React from "react";
import Link from "next/link";
import { linkToFilters, linkToTagCanonical } from "../lib/common/url";

export class JobTags extends React.Component<{ tags: string[] }> {
  render() {
    return (
      this.props.tags &&
      this.props.tags.length && (
        <div className="job-post-tags">
          <div className="tags left">
            {this.props.tags.map(t => (
              <Link
                href={linkToFilters({ tag: t.toLowerCase() })}
                as={linkToTagCanonical({ tag: t.toLowerCase() })}
                key={t}
              >
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
      )
    );
  }
}
