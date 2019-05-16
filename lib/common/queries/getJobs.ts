import { gql } from "apollo-boost";
import { Job } from "../../../graphql-types";

export type GetJobsQueryType = { getJobs: Job[] };

export type GetJobsVariables = {
  offset?: number;
  limit?: number;
  tag?: string;
  salary?: boolean;
  anywhere?: boolean;
  companyId?: string;
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
    $companyId: String
    $excludeLocationTags: [String!]
    $sources: [String!]
  ) {
    getJobs(
      offset: $offset
      limit: $limit
      tag: $tag
      salary: $salary
      anywhere: $anywhere
      companyId: $companyId
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
        id
        displayName
        imageUrl
      }
      locationDetails {
        countries
        regions
        raw
        timeZoneMin
        timeZoneMax
        worldwideConfirmed
      }
      salaryMin
      salaryMax
      salaryCurrency
      source
    }
  }
`;
