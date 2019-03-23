import { gql } from "apollo-boost";

export const getJobsQuery = gql`
  query getJobs($offset: Int, $limit: Int) {
    getJobs(offset: $offset, limit: $limit) {
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
