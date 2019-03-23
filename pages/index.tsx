import * as React from "react";
import "./index.scss";
import { ApolloConsumer, Query } from "react-apollo";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { JobListCollection } from "../components/JobList";
import { Job, TagCountGroup } from "../graphql-types";
import { withRouter, WithRouterProps } from "next/router";
import "../styles/common.scss";
import "../styles/job.scss";
import "../styles/markdown.scss";
import { TagSearchBox } from "../components/TagSearchBox";
import { getJobsQuery } from "../queries/getJobs";
import { getTagsQuery } from "../queries/getTags";

export default withRouter((props: WithRouterProps) => (
  <div>
    <Meta />
    <NavBar />
    <Query<{ getJobs: Job[]; getTagCountGroups: TagCountGroup[] }>
      query={getJobsQuery}
      variables={undefined}
    >
      {({ data }) => (
        <div className="container">
          <ApolloConsumer>
            {client => {
              const getTags = async (text: string) => {
                const queryResult = await client.query({
                  query: getTagsQuery,
                  variables: { text }
                });
                return queryResult.data.getTags;
              };
              return <TagSearchBox getTags={getTags} />;
            }}
          </ApolloConsumer>
          <div className="columns">
            <div className="column is-full">
              <JobListCollection
                router={props.router}
                jobs={data ? data.getJobs : []}
              />
            </div>
          </div>
        </div>
      )}
    </Query>
  </div>
));
