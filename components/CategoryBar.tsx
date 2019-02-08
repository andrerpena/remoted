import * as React from "react";
import "./CategoryBar.scss";

export const CategoryBar = () => (
  <div className="category-bar ">
    <div className="container">
      <div className="tabs">
        <ul>
          <li className="is-active">
            <a>All</a>
          </li>
          <li>
            <a>💻 Development</a>
          </li>
          <li>
            <a>🎧 Customer support</a>
          </li>
          <li>
            <a>📊 Marketing</a>
          </li>
          <li>
            <a>🎨 Design</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
