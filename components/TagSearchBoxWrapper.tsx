import { ApolloConsumer } from "react-apollo";
import { getTagsQuery } from "../queries/getTags";
import { TagSearchBox } from "./TagSearchBox";
import * as React from "react";
import { TagHero } from "./TagHero";

export interface TagSearchBoxWrapperProps {
  tag: string;
  onSelectTag: (tag: string) => void;
}

export function TagSearchBoxWrapper(props: TagSearchBoxWrapperProps) {
  return (
    <div className="banner-wrapper">
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
            <>
              <TagHero tag={props.tag} />
              <TagSearchBox
                getTags={getTags}
                initialValue={props.tag}
                onSelectTag={props.onSelectTag}
              />
            </>
          );
        }}
      </ApolloConsumer>
    </div>
  );
}
