import * as React from "react";
import { Banner } from "./Banner";

export interface TagSearchBoxWrapperProps {
  tag: string;
  onSelectTag: (tag: string) => void;
}

export function BannerWrapper(props: TagSearchBoxWrapperProps) {
  return (
    <Banner tag={props.tag} onSelectTag={props.onSelectTag}/>
  );
}
