import * as React from "react";

export interface BannerCompanyProps {
  companyName: string;
  companyImageUrl?: string;
}

export const BannerCompany: React.FunctionComponent<BannerCompanyProps> = ({
  companyName,
  companyImageUrl
}) => {
  return (
    <div className="banner-header">
      {companyImageUrl && (
        <figure className="image is-128x128">
          <img src={companyImageUrl} alt="" />
        </figure>
      )}
      <span className="banner-title">
        <span>Remote</span>
        <span className="title-tag">{companyName}</span>
        <span>jobs</span>
      </span>
    </div>
  );
};
