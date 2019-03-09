import * as React from "react";

export function JobDescription(props: { html: string }) {
  return (
    <div
      className="job-description markdown"
      dangerouslySetInnerHTML={{
        __html: props.html
      }}
    />
  );
}
