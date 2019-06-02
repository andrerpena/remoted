import "./NavBar.scss";
import { Logo } from "./Logo";
import * as React from "react";
import * as classNames from "classnames";

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
              href={
                "https://join.slack.com/t/remoted/shared_invite/enQtNjMxOTQwMDk0MzI0LTk0YjhjY2U2NTI5Yzg0Zjg0Y2RlMWM1ZWI5OTExNWRlMjIyNzE1MmQyMjhmM2U1YmQ4OWEzYzhmMDJmN2U2YzM"
              }
            >
              <i className="fab fa-slack" /> Slack
            </a>
            <a
              className="navbar-item"
              target="__blank"
              href="https://github.com/remoted-io/remoted"
            >
              <i className="fab fa-github" /> GitHub
            </a>
            <a
              className="navbar-item"
              href="https://twitter.com/remoted_io"
              target="_blank"
            >
              <i className="fab fa-twitter" /> Twitter
            </a>
            <a
              className="navbar-item"
              target="__blank"
              href="https://remoted.io/graphql"
            >
              <i className="fas fa-cloud" /> GraphQL API
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
