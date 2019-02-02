import * as React from "react";
import Link from "next/link";
import "./index.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export const allPostsQuery = gql`
  query allJobs {
    jobs {
      id
      title
    }
  }
`;

export default () => (
  <div>
    <Query query={allPostsQuery} variables={undefined}>
      {result => {
        console.log(result);
        return <div>Hello</div>;
      }}
    </Query>
    Welcome to next.js!
    <Link href="/about">
      <a>GO</a>
    </Link>
  </div>
);
