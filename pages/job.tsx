import * as React from "react";
import { Query } from "react-apollo";
import { JobView } from "../components/JobView";
import { Job } from "../graphql-types";
import * as Next from "next";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { getTitleForJob } from "../lib/common/title";
import { getJobQuery } from "../lib/common/queries/getJob";

export interface JobPageProps {
  id: string;
}

const JobPage = function(props: JobPageProps) {
  return (
    <div>
      <Meta title={getTitleForJob()} />
      <NavBar />
      <div className="container">
        <div className="columns">
          <div className="column is-full">
            <div className="box-white">
              <Query<{ getJob: Job }>
                query={getJobQuery}
                variables={{
                  jobId: props.id
                }}
              >
                {({ data }) => (data ? <JobView job={data.getJob} /> : null)}
              </Query>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

JobPage.getInitialProps = async ({ query }: Next.NextContext) => {
  return {
    id: query.publicId
  };
};

export default JobPage;
