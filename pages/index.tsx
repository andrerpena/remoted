import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { JobListCollection } from "../components/JobList";
import { Job, TagCountGroup } from "../graphql-types";
import { withRouter, WithRouterProps } from "next/router";
import "../styles/common.scss";
import "../styles/job.scss";
import "../styles/markdown.scss";
import { getJobsQuery } from "./index-queries";

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
