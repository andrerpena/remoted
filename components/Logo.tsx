import "./Logo.scss";
import * as React from "react";
import * as classNames from "classnames";
import Link from "next/link";

export interface LogoProps {
  size: "small" | "large";
  className?: string;
}

export const Logo = (props: LogoProps) => (
  <Link href="/">
    <a className={classNames("logo", props.size, props.className)}>
      <img src={"/static/logo_full.png"} alt={"logo"} />
    </a>
  </Link>
);
