import * as React from "react";
import { Job } from "../server/model";
import "./JobList.scss";
import { JobPost } from "./JobPost";

export interface JobBoardProps {
  jobs: Job[];
}
export const JobBoard = (props: JobBoardProps) => (
  <ul className="job-list">
    {props.jobs.map(j => (
      <JobPost {...j} />
    ))}
  </ul>
);
