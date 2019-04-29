import * as React from "react";
import { Query } from "react-apollo";
import {
  getCompanyQuery,
  GetCompanyQueryType,
  GetCompanyQueryVariables
} from "../lib/common/queries/getCompany";
import Head from "next/head";

export interface BannerCompanyProps {
  company: string;
}

export const BannerCompany: React.FunctionComponent<BannerCompanyProps> = ({
  company
}) => {
  return (
    <div className="banner-header p-bottom">
      <Query<GetCompanyQueryType, GetCompanyQueryVariables>
        query={getCompanyQuery}
        variables={{ companyId: company }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading }) => {
          if (loading) {
            return <i className="fas fa-spinner loading" style={{}} />;
          }
          if (!data) {
            return null;
          }
          const { imageUrl, displayName } = data.getCompany;
          return (
            <>
              <Head>
                <title>Remote jobs at {displayName} - Remoted.io</title>
              </Head>
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
