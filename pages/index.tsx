import * as React from "react";
import Link from "next/link";
import "./index.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export const getJobsQuery = gql`
  query getJobs($offset: Int, $limit: Int) {
    jobs(offset: $offset, limit: $limit) {
      id
      title
    }
  }
`;

export default () => (
  <div>
    <Query query={getJobsQuery} variables={undefined}>
      {() => {
        return <div>Hello</div>;
      }}
    </Query>
    Welcome to next.js!
    <Link href="/about">
      <a>GO</a>
    </Link>
  </div>
);
