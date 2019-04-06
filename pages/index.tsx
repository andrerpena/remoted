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
import * as Next from "next";
import { navigateToTag } from "../lib/client/navigation";
import { PAGE_SIZE } from "../lib/common/constants";
import { filterPageData, isThereMore } from "../lib/common/pagination";
import { Header } from "../components/Header";

export interface IndexPageProps extends WithRouterProps {
  tag: string;
}

type QueryType = { getJobs: Job[]; getTagCountGroups: TagCountGroup[] };

const IndexPage = (props: IndexPageProps) => {
  return (
    <div>
      <Meta />
      <NavBar />
      <Query<QueryType>
        query={getJobsQuery}
        variables={{
          hasTag: props.tag,
          limit: PAGE_SIZE + 1
        }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, fetchMore, loading }) => (
          <div className="container">
            <Header tag={props.tag} onSelectTag={tag => navigateToTag(tag)} />
            <div className="columns">
              <div className="column is-full">
                <JobListCollection
                  router={props.router}
                  jobs={data ? data.getJobs : []}
                  onLoadMore={() =>
                    loadMoreJobs(data ? data.getJobs : [], props.tag, fetchMore)
                  }
                  loading={loading}
                  thereIsMore={isThereMore(data ? data.getJobs : [])}
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

function loadMoreJobs(
  allJobs: Job[],
  hasTag: string,
  fetchMore: (options: any) => void
) {
  fetchMore({
    variables: {
      offset: allJobs.length,
      limit: PAGE_SIZE + 1,
      hasTag
    },
    updateQuery: (previousResult: QueryType, { fetchMoreResult }: any) => {
      if (!fetchMoreResult) {
        return previousResult;
      }
      return Object.assign({}, previousResult, {
        // Append the new posts results to the old one
        getJobs: [
          ...previousResult.getJobs,
          ...filterPageData(fetchMoreResult.getJobs)
        ]
      });
    }
  });
}
