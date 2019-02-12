import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { Job } from "../server/model";
import { JobBoard } from "../components/JobList";
import { MiniHero } from "../components/MiniHero";
import { BoxDefault } from "../components/BoxDefault";

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
    <Meta />
    <NavBar />
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="box-white">
            <div className="box-white-header">
              <h5 className="title is-5">Today</h5>
            </div>
            <Query<{ jobs: Job[] }> query={getJobsQuery} variables={undefined}>
              {({ data }) => (data ? <JobBoard jobs={data.jobs} /> : null)}
            </Query>
          </div>
        </div>
        <div className="column">
          <MiniHero />
          <div className="box-white">Subscribe</div>
          <div className="box-white">My favorite tags</div>
          <div className="box-white">Top tags</div>
          <div className="box-white">Top remote companies</div>
        </div>
      </div>
    </div>
  </div>
);
