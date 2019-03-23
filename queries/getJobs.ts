import { gql } from "apollo-boost";

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
        imageUrl
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
