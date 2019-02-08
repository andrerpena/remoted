import * as React from "react";
import "./MiniHero.scss";

export const MiniHero = () => (
  <div className="mini-hero box-transparent">
    <a href="#" className="company-name">
      {" "}
      <i className="fas fa-location-arrow" /> remoted
    </a>{" "}
    is a remote IT job aggregator to help you work from anywhere in the world 🌏
    <div className="social-media">
      <a
        className="social-media-box twitter"
        href="https://twitter.com/@remoted_io"
      >
        {" "}
        <i className="fab fa-twitter" /> Twitter{" "}
      </a>
      <a
        className="social-media-box reddit"
        href="https://www.reddit.com/r/remoted_io"
      >
        <i className="fab fa-reddit-alien" /> Reddit{" "}
      </a>
    </div>
  </div>
);
