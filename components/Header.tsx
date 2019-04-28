import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../lib/common/queries/getTags";
import { SearchBox } from "./SearchBox";
import { IndexQuery } from "../lib/common/query-types";
import { FilterQuery } from "../lib/common/url";
import { BannerTag } from "./BannerTag";
import { BannerCompany } from "./BannerCompany";
import Head from "next/head";

export type JobListCollectionHeaderProps = {
  query: IndexQuery;
  onFilter: (searchData: FilterQuery) => void;
};

export function Header({ query, onFilter }: JobListCollectionHeaderProps) {
  let [showSearch, setShowSearch] = React.useState(!query.tag);
  let [previousTag, setPreviousTag] = React.useState(query.tag);

  if (previousTag !== query.tag) {
    setPreviousTag(query.tag);
    setShowSearch(!query.tag);
  }

  return (
    <div className="header">
      <Head>
        <title>
          Remote job aggregator for developers and IT professionals | Remoted
        </title>
      </Head>
      {query.company && <BannerCompany company={query.company} />}
      {!showSearch && query.tag && (
        <BannerTag tag={query.tag} onHeaderClick={() => setShowSearch(true)} />
      )}
      {!query.company && (
        <ApolloConsumer>
          {client => {
            const getTags = async (text: string) => {
              const queryResult = await client.query({
                query: getTagsQuery,
                variables: { text }
              });
              return queryResult.data.getTags;
            };
            return (
              <SearchBox
                getTags={getTags}
                onFilter={onFilter}
                displaySearchBar={showSearch}
                query={query}
              />
            );
          }}
        </ApolloConsumer>
      )}
    </div>
  );
}
