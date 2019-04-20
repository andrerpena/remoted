import { gql } from "apollo-boost";

export const getJobQuery = gql`
  query getJob($jobId: String) {
    getJob(id: $jobId) {
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
      source
    }
  }
`;
