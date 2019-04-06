import { getIconForTag } from "../lib/common/tag-icons";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../queries/getTags";
import { SearchBox } from "./SearchBox";
import { FilterData } from "../lib/common/url";

export interface JobListCollectionHeaderProps {
  tag: string;
  onFilter: (searchData: FilterData) => void;
}

export function JobListCollectionHeader(props: JobListCollectionHeaderProps) {
  const { tag, onFilter } = props;
  const icon = getIconForTag(tag);
  const prefix = icon ? icon.prefix || "fab" : "";
  const tagElement = icon ? (
    <i
      className={`${prefix} fa-${icon.icon} title-tag-icon`}
      style={icon.color ? { color: icon.color } : {}}
    />
  ) : //) : <i className="fas fa-location-arrow title-tag-icon title-tag-icon-default"/>;
  null;

  let [showSearchBar, setShowSearchBar] = React.useState(false);

  if (!tag) {
    showSearchBar = true;
  }

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

  const tagSearch = (
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
          <SearchBox getTags={getTags} tag={tag} onFilter={onFilter} />
        );
      }}
    </ApolloConsumer>
  );

  return (
    <div className="header">
      {!showSearchBar && bannerHeader}
      {showSearchBar && tagSearch}
    </div>
  );
}
