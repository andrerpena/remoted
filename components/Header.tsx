import { getIconForTag } from "../lib/common/tag-icons";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../lib/common/queries/getTags";
import { SearchBox } from "./SearchBox";
import { IndexQuery } from "../lib/common/query-types";
import { FilterQuery } from "../lib/common/url";

export type JobListCollectionHeaderProps = IndexQuery & {
  onFilter: (searchData: FilterQuery) => void;
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

  let [showSearch, setShowSearch] = React.useState(!props.tag);
  let [previousTag, setPreviousTag] = React.useState(props.tag);

  if (previousTag !== props.tag) {
    setPreviousTag(props.tag);
    setShowSearch(!props.tag);
  }

  const banner = tag ? (
    <div className="banner-header" onClick={() => setShowSearch(true)}>
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
            displaySearchBar={showSearch}
            {...props}
          />
        );
      }}
    </ApolloConsumer>
  );

  return (
    <div className="header">
      {!showSearch && banner}
      {searchBar}
    </div>
  );
}
