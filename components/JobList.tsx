import * as React from "react";
import "./JobList.scss";
import { JobPost } from "./JobPost";
import { Job } from "../graphql-types";
import { SingletonRouter } from "next-server/router";

export interface JobListProps {
  jobs: Job[];
  router?: SingletonRouter;
}

export const JobList = (props: JobListProps) => (
  <ul className="job-list">
    {props.jobs.map(j => (
      <JobPost job={j} router={props.router} />
    ))}
  </ul>
);
