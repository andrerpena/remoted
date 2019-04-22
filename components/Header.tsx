import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../lib/common/queries/getTags";
import { SearchBox } from "./SearchBox";
import { IndexQuery } from "../lib/common/query-types";
import { FilterQuery } from "../lib/common/url";
import { Banner } from "./Banner";

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
      {!showSearch && query.tag && (
        <Banner
          tag={query.tag}
          company={query.company}
          onHeaderClick={() => setShowSearch(true)}
        />
      )}
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
    </div>
  );
}
