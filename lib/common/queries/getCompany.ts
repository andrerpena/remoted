import { gql } from "apollo-boost";
import { Company } from "../../../graphql-types";

export type GetCompanyQueryType = { getCompany: Company };

export type GetCompanyQueryVariables = {
  companyId: String;
};

export const getCompanyQuery = gql`
  query getCompany($companyId: String) {
    getCompany(id: $companyId) {
      displayName
      imageUrl
      name
    }
  }
`;
