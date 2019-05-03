import "./Logo.scss";
import * as React from "react";
import * as classNames from "classnames";

export interface LogoProps {
  size: "small" | "large";
}

export const Logo = (props: LogoProps) => (
  <a href={"/"}>
    <div className={classNames("logo", props.size)}>
      <img src={"/static/logo_full.png"} alt={"logo"} />
    </div>
  </a>
);
