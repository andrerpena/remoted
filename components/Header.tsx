import { getIconForTag } from "../lib/common/tag-icons";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../lib/common/queries/getTags";
import { SearchBox } from "./SearchBox";
import { IndexQuery } from "../lib/common/query-types";
import { FilterQuery } from "../lib/common/url";

export type JobListCollectionHeaderProps = {
  query: IndexQuery;
  onFilter: (searchData: FilterQuery) => void;
};

export function Header({ query, onFilter }: JobListCollectionHeaderProps) {
  const icon = getIconForTag(query.tag);
  const prefix = icon ? icon.prefix || "fab" : "";
  const tagElement = icon ? (
    <i
      className={`${prefix} fa-${icon.icon} title-tag-icon`}
      style={icon.color ? { color: icon.color } : {}}
    />
  ) : null;

  let [showSearch, setShowSearch] = React.useState(!query.tag);
  let [previousTag, setPreviousTag] = React.useState(query.tag);

  if (previousTag !== query.tag) {
    setPreviousTag(query.tag);
    setShowSearch(!query.tag);
  }

  return (
    <div className="header">
      {!showSearch && query.tag && (
        <div className="banner-header" onClick={() => setShowSearch(true)}>
          {tagElement}
          <span className="banner-title">
            <span>Remote</span>
            <span className="title-tag">{query.tag}</span>
            <span>jobs</span>
          </span>
        </div>
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
