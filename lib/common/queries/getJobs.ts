import { gql } from "apollo-boost";
import { Job } from "../../../graphql-types";

export type GetJobsQueryType = { getJobs: Job[] };

export const getJobsQuery = gql`
  query getJobs($offset: Int, $limit: Int, $hasTag: String) {
    getJobs(offset: $offset, limit: $limit, hasTag: $hasTag) {
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
      locationPreferred
      locationPreferredTimeZone
      locationPreferredTimeZoneTolerance
      salaryMin
      salaryMax
      salaryCurrency
      source {
        name
      }
    }
  }
`;
