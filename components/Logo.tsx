import "./Logo.scss";
import * as React from "react";
import * as classNames from "classnames";

export interface LogoProps {
  size: "small" | "large";
}

export const Logo = (props: LogoProps) => (
  <div className={classNames("logo", props.size)}>
    <span className="logo-icon-wrapper">
      <i className="fas fa-location-arrow" />
    </span>
    <span className="text">remoted</span>
  </div>
);
