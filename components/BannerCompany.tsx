import * as React from "react";
import { Query } from "react-apollo";
import {
  getCompanyQuery,
  GetCompanyQueryType,
  GetCompanyQueryVariables
} from "../lib/common/queries/getCompany";

export interface BannerCompanyProps {
  company: string;
}

export const BannerCompany: React.FunctionComponent<BannerCompanyProps> = ({
  company
}) => {
  return (
    <div className="banner-header">
      <Query<GetCompanyQueryType, GetCompanyQueryVariables>
        query={getCompanyQuery}
        variables={{ companyId: company }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading }) => {
          console.log(data);
          console.log(loading);
          if (loading) {
            return <i className="fas fa-spinner loading" style={{}} />;
          }
          if (!data) {
            return null;
          }
          const { imageUrl, displayName } = data.getCompany;
          return (
            <>
              {imageUrl && (
                <figure className="image">
                  <img src={imageUrl} alt="" />
                </figure>
              )}
              <span className="banner-title">
                <span>Remote jobs at {displayName}</span>
              </span>
            </>
          );
        }}
      </Query>
    </div>
  );
};
