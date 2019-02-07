import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { Job } from "../server/model";
import { JobBoard } from "../components/JobList";

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
          <div className="box-default">
            <div className="box-default-header">
              <h5 className="title is-5">Today</h5>
            </div>
            <Query<{ jobs: Job[] }> query={getJobsQuery} variables={undefined}>
              {({ data }) => (data ? <JobBoard jobs={data.jobs} /> : null)}
            </Query>
          </div>
        </div>
        <div className="column">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
            porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam
            gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
            Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
            arcu et sollicitudin porttitor, tortor urna tempor ligula, id
            porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
            facilisis sodales sem.
          </div>
          <div className="box-default">Subscribe</div>
          <div className="box-default">My favorite tags</div>
          <div className="box-default">Top tags</div>
          <div className="box-default">Top remote companies</div>
        </div>
      </div>
    </div>
  </div>
);
