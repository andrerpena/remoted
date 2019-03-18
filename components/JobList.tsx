import * as React from "react";
import "./JobList.scss";
import { JobPost } from "./JobPost";
import { Job } from "../graphql-types";
import { SingletonRouter } from "next-server/router";
import { bucketize } from "../lib/time";

export interface JobListProps {
  jobs: Job[];
  router?: SingletonRouter;
  title: string;
}

export const JobList = (props: JobListProps) => (
  <>
    <div className="box-white">
      <div className="box-white-header">
        <h5 className="title is-5">{props.title}</h5>
      </div>
      <ul className="job-list">
        {props.jobs.map(j => (
          <JobPost key={j.id} job={j} router={props.router} />
        ))}
      </ul>
    </div>
  </>
);

export interface JobListCollectionProps {
  jobs: Job[];
  router?: SingletonRouter;
}

export const JobListCollection = (props: JobListCollectionProps) => {
  const buckets = bucketize(props.jobs, job => new Date(job.publishedAt));
  return (
    <>
      {buckets.map(b => (
        <JobList
          key={b.title}
          jobs={b.data}
          title={b.title}
          router={props.router}
        />
      ))}
    </>
  );
};
