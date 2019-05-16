import { gql } from "apollo-boost";
import { Job } from "../../../graphql-types";

export type GetJobQueryType = { getJob: Job };

export type GetJobQueryVariables = {
  id: string;
};

export const getJobQuery = gql`
  query getJob2($id: String) {
    getJob(id: $id) {
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
        description
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
