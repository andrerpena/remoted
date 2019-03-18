import "./NavBar.scss";
import { Logo } from "./Logo";
import * as React from "react";

export const NavBar = () => (
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
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start" />

        <div className="navbar-end">
          <a className="navbar-item">🤖 API</a>
          <a className="navbar-item">💻 CLI</a>
          <a className="navbar-item">📊 Stats</a>
          <a className="navbar-item">📖 About </a>
        </div>
      </div>
    </div>
  </nav>
);
