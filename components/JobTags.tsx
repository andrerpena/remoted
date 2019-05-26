import * as React from "react";
import Link from "next/link";
import { linkToFilters, linkToTagCanonical } from "../lib/common/url";

export interface JobTagsProps {
  tags: string[];
  specialLinks?: Array<{ link: string; text: string }>;
}

export const JobTags: React.FunctionComponent<JobTagsProps> = ({
  tags,
  specialLinks
}) => {
  if ((!tags || !tags.length) && (!specialLinks || !specialLinks.length)) {
    return null;
  }
  return (
    <div className="job-post-tags">
      <div className="tags left">
        {tags &&
          tags.map(t => (
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
        {specialLinks &&
          specialLinks.map((s, i) => (
            <a
              key={`sl-${i}`}
              className="tag is-light"
              onClick={e => e.stopPropagation()}
              href={s.link}
              target={"_blank"}
            >
              {s.text}
            </a>
          ))}
      </div>
    </div>
  );
};
