import * as React from "react";
import { getIconForTag } from "../lib/common/tag-icons";

export interface BannerTagProps {
  tag: string;
  onHeaderClick: () => void;
}

export const BannerTag: React.FunctionComponent<BannerTagProps> = ({
  tag,
  onHeaderClick
}) => {
  const icon = getIconForTag(tag);
  const prefix = icon ? icon.prefix || "fab" : "";

  return (
    <div className="banner-header clickable" onClick={() => onHeaderClick()}>
      {icon && (
        <i
          className={`${prefix} fa-${icon.icon} title-tag-icon`}
          style={icon.color ? { color: icon.color } : {}}
        />
      )}
      <span className="banner-title">
        <span>Remote</span>
        <span className="title-tag">{tag}</span>
        <span>jobs</span>
      </span>
    </div>
  );
};
