import * as React from "react";
import { getIconForTag } from "../lib/common/tag-icons";

export interface BannerProps {
  tag?: string;
  company?: string;
  onHeaderClick: () => void;
}

export const Banner: React.FunctionComponent<BannerProps> = ({
  tag,
  onHeaderClick
}) => {
  let imageElement: React.ReactNode | null = null;

  if (tag) {
    const icon = getIconForTag(tag);
    const prefix = icon ? icon.prefix || "fab" : "";
    imageElement = icon ? (
      <i
        className={`${prefix} fa-${icon.icon} title-tag-icon`}
        style={icon.color ? { color: icon.color } : {}}
      />
    ) : null;
  }

  return (
    <div className="banner-header" onClick={() => onHeaderClick()}>
      {imageElement}
      <span className="banner-title">
        <span>Remote</span>
        <span className="title-tag">{tag}</span>
        <span>jobs</span>
      </span>
    </div>
  );
};
