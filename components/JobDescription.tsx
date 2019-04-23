import * as React from "react";
import * as classNames from "classnames";

export function JobDescription(props: { html: string; className?: string }) {
  return (
    <div
      className={classNames("job-description", "markdown", props.className)}
      dangerouslySetInnerHTML={{
        __html: props.html
      }}
    />
  );
}
