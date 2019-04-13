import { getIconForTag } from "../lib/common/tag-icons";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../queries/getTags";
import { SearchBox } from "./SearchBox";
import { FilterData } from "../lib/common/url";
import { IndexQuery } from "../lib/common/query-types";

export type JobListCollectionHeaderProps = IndexQuery & {
  onFilter: (searchData: FilterData) => void;
};

export function Header(props: JobListCollectionHeaderProps) {
  const { tag, onFilter } = props;
  const icon = getIconForTag(tag);
  const prefix = icon ? icon.prefix || "fab" : "";
  const tagElement = icon ? (
    <i
      className={`${prefix} fa-${icon.icon} title-tag-icon`}
      style={icon.color ? { color: icon.color } : {}}
    />
  ) : null;

  let [showSearchBar, setShowSearchBar] = React.useState(!props.tag);

  const bannerHeader = tag ? (
    <div className="banner-header" onClick={() => setShowSearchBar(true)}>
      {tagElement}
      <span className="banner-title">
        <span>Remote</span>
        <span className="title-tag">{tag}</span>
        <span>jobs</span>
      </span>
    </div>
  ) : null;

  const searchBar = (
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
            displaySearchBar={showSearchBar}
            {...props}
          />
        );
      }}
    </ApolloConsumer>
  );

  return (
    <div className="header">
      {!showSearchBar && bannerHeader}
      {searchBar}
    </div>
  );
}
