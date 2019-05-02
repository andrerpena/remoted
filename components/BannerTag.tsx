import * as React from "react";
import { getIconForTag } from "../lib/common/tag-icons";
import Head from "next-server/head";
import { getSearchTagLineFor } from "../lib/common/search";
import { IndexQuery } from "../lib/common/query-types";
import { toTitleCase } from "../lib/common/tags";

export interface BannerTagProps {
  query: IndexQuery;
  onHeaderClick: () => void;
}

export const BannerTag: React.FunctionComponent<BannerTagProps> = ({
  query,
  onHeaderClick
}) => {
  const icon = getIconForTag(query.tag);
  const prefix = icon ? icon.prefix || "fab" : "";

  return (
    <>
      <Head>
        <title>{getSearchTagLineFor(query)} - Remoted.io</title>
      </Head>
      <div className="banner-header clickable" onClick={() => onHeaderClick()}>
        {icon && (
          <i
            className={`${prefix} fa-${icon.icon} title-tag-icon`}
            style={icon.color ? { color: icon.color } : {}}
          />
        )}
        <h1 className="banner-title">
          <span>Remote</span>
          <span className="title-tag">{toTitleCase(query.tag)}</span>
          <span>jobs</span>
        </h1>
      </div>
    </>
  );
};
