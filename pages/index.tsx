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
import { getJobsQuery } from "../queries/getJobs";
import { TagSearchBoxWrapper } from "../components/TagSearchBoxWrapper";
import * as Next from "next";
import { navigateToTag } from "../lib/client/navigation";

export interface IndexPageProps extends WithRouterProps {
  tag: string;
}

const IndexPage = (props: IndexPageProps) => {
  return (
    <div>
      <Meta />
      <NavBar />
      <Query<{ getJobs: Job[]; getTagCountGroups: TagCountGroup[] }>
        query={getJobsQuery}
        variables={{
          hasTag: props.tag
        }}
      >
        {({ data }) => (
          <div className="container">
            <TagSearchBoxWrapper
              tag={props.tag}
              onSelectTag={tag => navigateToTag(tag)}
            />
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
  );
};

IndexPage.getInitialProps = async ({ query }: Next.NextContext) => {
  return {
    tag: query.tag
  };
};

export default withRouter(IndexPage);
