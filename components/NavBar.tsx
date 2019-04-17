import "./NavBar.scss";
import { Logo } from "./Logo";
import * as React from "react";
import * as classNames from "classnames";

export const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <nav
      className="main-nav navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <Logo />
          </a>
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
          </div>
        </div>
      </div>
    </nav>
  );
};
