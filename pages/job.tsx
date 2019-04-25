import * as React from "react";
import { Query } from "react-apollo";
import { JobView } from "../components/JobView";
import * as Next from "next";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import {
  getJobQuery,
  GetJobQueryType,
  GetJobQueryVariables
} from "../lib/common/queries/getJob";

export interface JobPageProps {
  id: string;
}

const JobPage = function(props: JobPageProps) {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="columns">
          <div className="column is-full">
            <div className="box-white">
              <Query<GetJobQueryType, GetJobQueryVariables>
                query={getJobQuery}
                variables={{
                  id: props.id
                }}
              >
                {({ data }) => {
                  console.log(data);
                  if (!data || !data.getJob) {
                    return "nothing";
                  }

                  return <JobView job={data.getJob} />;
                }}
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
