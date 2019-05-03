import "./NavBar.scss";
import { Logo } from "./Logo";
import * as React from "react";
import * as classNames from "classnames";
import Link from "next/link";

export interface NavBarProps {
  hideLogo?: boolean;
}

export const NavBar = ({ hideLogo }: NavBarProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <nav
      className="main-nav navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {!hideLogo && <Logo size={"small"} className="navbar-item" />}
          <a
            role="button"
            className={classNames("navbar-burger", "burger", {
              "is-active": open
            })}
            aria-label="menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen(!open)}
            data-target="main-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="main-menu"
          className={classNames("navbar-menu", { "is-active": open })}
        >
          <div className="navbar-start" />
          <div className="navbar-end">
            <a
              className="navbar-item"
              target="__blank"
              href="https://github.com/remoted-io/remoted/issues"
            >
              🔥 Issues
            </a>
            <a
              className="navbar-item"
              target="__blank"
              href="https://remoted.io/graphql"
            >
              🤖 GraphQL API
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a
                  className="navbar-item"
                  href="https://twitter.com/remoted_io"
                  target="_blank"
                >
                  Twitter
                </a>
                <a
                  className="navbar-item"
                  href="https://www.indiehackers.com/product/remoted"
                  target="_blank"
                >
                  Indie Hackers
                </a>
                <a
                  className="navbar-item"
                  href="https://www.producthunt.com/posts/remoted-io"
                  target="_blank"
                >
                  Product Hunt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
