import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { JobListCollection } from "../components/JobList";
import { MiniHero } from "../components/MiniHero";
import { Job } from "../graphql-types";
import { withRouter, WithRouterProps } from "next/router";
import "../styles/common.scss";
import "../styles/job.scss";
import "../styles/markdown.scss";

export const getJobsQuery = gql`
  query getJobs($offset: Int, $limit: Int) {
    jobs(offset: $offset, limit: $limit) {
      id
      title
      url
      descriptionHtml
      tags
      publishedAt
      company {
        displayName
        imageUrl
      }
      locationRaw
      locationRequired
      locationPreferred
      locationPreferredTimeZone
      locationPreferredTimeZoneTolerance
      salaryMin
      salaryMax
      salaryCurrency
      source {
        name
      }
    }
  }
`;

export default withRouter((props: WithRouterProps) => (
  <div>
    <Meta />
    <NavBar />
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <Query<{ jobs: Job[] }> query={getJobsQuery} variables={undefined}>
            {({ data }) =>
              data ? (
                <JobListCollection router={props.router} jobs={data.jobs} />
              ) : null
            }
          </Query>
        </div>
        <div className="column">
          <MiniHero />
          <div className="box-white">Subscribe</div>
          <div className="box-white">My favorite tags</div>
          <div className="box-white">Top tags</div>
        </div>
      </div>
    </div>
  </div>
));
