import * as React from "react";
import "./index.scss";
import { Query } from "react-apollo";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { JobListCollection } from "../components/JobList";
import { Job } from "../graphql-types";
import { withRouter, WithRouterProps } from "next/router";
import "../styles/common.scss";
import "../styles/job.scss";
import "../styles/markdown.scss";
import { getJobsQuery, GetJobsQueryType } from "../lib/common/queries/getJobs";
import * as Next from "next";
import { navigateToFilter } from "../lib/client/navigation";
import { PAGE_SIZE } from "../lib/common/constants";
import { filterPageData, isThereMore } from "../lib/common/pagination";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { IndexQuery } from "../lib/common/query-types";
import { getTitleForIndex } from "../lib/common/title";

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
    updateQuery: (
      previousResult: GetJobsQueryType,
      { fetchMoreResult }: any
    ) => {
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

export type IndexPageProps = IndexQuery & WithRouterProps;

const IndexPage = (props: IndexPageProps) => {
  return (
    <div>
      <Meta title={getTitleForIndex(props)} />
      <NavBar />
      <Query<GetJobsQueryType>
        query={getJobsQuery}
        variables={{
          tag: props.tag,
          limit: PAGE_SIZE + 1
        }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, fetchMore, loading }) => (
          <div className="container">
            <Header onFilter={filter => navigateToFilter(filter)} {...props} />
            <div className="columns">
              <div className="column is-full">
                {loading && (
                  <div className="box-white loading-box">
                    <i className="fas fa-spinner" /> Loading...
                  </div>
                )}
                <JobListCollection
                  router={props.router}
                  jobs={data ? data.getJobs : []}
                  onLoadMore={() =>
                    loadMoreJobs(data ? data.getJobs : [], props.tag, fetchMore)
                  }
                  loading={loading}
                  thereIsMore={
                    !loading && isThereMore(data ? data.getJobs : [])
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Query>
      <Footer />
    </div>
  );
};

IndexPage.getInitialProps = async ({ query }: Next.NextContext) => {
  return {
    tag: query.tag,
    // default filters
    salary: query.salary === "true",
    regionfree: query.regionfree === "true",
    // location
    nousonly: query.nousonly === "true",
    nonorthamericaonly: query.nonorthamericaonly === "true",
    noukonly: query.noukonly === "true",
    noeuropeonly: query.noeuropeonly === "true",
    // source
    stackoverflow: query.stackoverflow === "true",
    weworkremotely: query.weworkremotely === "true",
    authenticjobs: query.authenticjobs === "true"
  } as IndexQuery;
};

export default withRouter(IndexPage);
