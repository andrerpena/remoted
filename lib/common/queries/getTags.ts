import { gql } from "apollo-boost";

export const getTagsQuery = gql`
  query getTags($text: String) {
    getTags(text: $text) {
      count
      name
    }
  }
`;
