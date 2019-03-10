import * as React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { JobView } from "../components/JobView";
import { Job } from "../graphql-types";
import * as Next from "next";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { MiniHero } from "../components/MiniHero";

export const getJobQuery = gql`
  query getJob($jobId: String) {
    job(id: $jobId) {
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

export interface JobPageProps {
  id: string;
}

const JobPage = function(props: JobPageProps) {
  return (
    <div>
      <Meta />
      <NavBar />
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="box-white">
              <Query<{ job: Job }>
                query={getJobQuery}
                variables={{
                  jobId: props.id
                }}
              >
                {({ data }) => (data ? <JobView job={data.job} /> : null)}
              </Query>
            </div>
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
  );
};

JobPage.getInitialProps = async ({ query }: Next.NextContext) => {
  return {
    id: query.publicId
  };
};

export default JobPage;
