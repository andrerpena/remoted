import * as React from "react";
import "./JobList.scss";
import { JobPost } from "./JobPost";
import { Job } from "../graphql-types";
import { SingletonRouter } from "next-server/router";
import { bucketize } from "../lib/common/time";
import { IndexQuery } from "../lib/common/query-types";
import { getSearchTagLineFor } from "../lib/common/search";

export interface JobListProps {
  jobs: Job[];
  router?: SingletonRouter;
  title: string;
  query: IndexQuery;
}

export const JobList = ({ jobs, router, title, query }: JobListProps) => (
  <div className="job-list">
    <div className="box-white">
      <div className="box-white-header">
        <h5 className="title is-5">
          {title}{" "}
          <span className="tagline">- {getSearchTagLineFor(query)}</span>
        </h5>
      </div>
      <ul>
        {jobs.map(j => (
          <JobPost key={j.id} job={j} router={router} query={query} />
        ))}
      </ul>
    </div>
  </div>
);

export type JobListCollectionProps = {
  jobs: Job[];
  router?: SingletonRouter;
  onLoadMore: () => void;
  loading: boolean;
  showLoadMore: boolean;
  query: IndexQuery;
};

export const JobListCollection = ({
  jobs,
  router,
  onLoadMore,
  loading,
  showLoadMore,
  query
}: JobListCollectionProps) => {
  const buckets = bucketize(jobs, job => new Date(job.publishedAt));
  const onClick = () => (loading ? undefined : onLoadMore());
  const text = loading ? "Good luck next page! 🤑" : "Load more";
  return (
    <>
      {buckets.map(b => (
        <JobList
          key={b.title}
          jobs={b.data}
          title={b.title}
          router={router}
          query={query}
        />
      ))}
      {showLoadMore && (
        <a className="button is-primary is-fullwidth" onClick={onClick}>
          <i className="fas fa-space fa-arrow-down" />
          {text}
        </a>
      )}
    </>
  );
};
