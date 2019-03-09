import * as React from "react";
import "./JobList.scss";
import { JobPost } from "./JobPost";
import { Job } from "../graphql-types";

export interface JobListProps {
  jobs: Job[];
}
export const JobList = (props: JobListProps) => (
  <ul className="job-list">
    {props.jobs.map(j => (
      <JobPost job={j} />
    ))}
  </ul>
);
