import { gql } from "apollo-boost";
import { Job } from "../../../graphql-types";

export type GetJobsQueryType = { getJobs: Job[] };

export type GetJobsVariables = {
  offset?: number;
  limit?: number;
  tag?: string;
  salary?: boolean;
  anywhere?: boolean;
  excludeLocationTags?: string[];
  sources?: string[];
};

export const getJobsQuery = gql`
  query getJobs(
    $offset: Int
    $limit: Int
    $tag: String
    $salary: Boolean
    $anywhere: Boolean
    $excludeLocationTags: [String!]
    $sources: [String!]
  ) {
    getJobs(
      offset: $offset
      limit: $limit
      tag: $tag
      salary: $salary
      anywhere: $anywhere
      excludeLocationTags: $excludeLocationTags
      sources: $sources
    ) {
      id
      title
      url
      descriptionHtml
      tags
      publishedAt
      company {
        displayName
        imageUrl20x20
      }
      locationRaw
      locationRequired
      locationTag
      locationPreferred
      locationPreferredTimeZone
      locationPreferredTimeZoneTolerance
      salaryMin
      salaryMax
      salaryCurrency
      source
    }
  }
`;