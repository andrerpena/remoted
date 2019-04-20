import { gql } from "apollo-boost";
import { Job } from "../../../graphql-types";

export type GetJobsQueryType = { getJobs: Job[] };

export const getJobsQuery = gql`
  query getJobs($offset: Int, $limit: Int, $tag: String) {
    getJobs(offset: $offset, limit: $limit, tag: $tag) {
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
