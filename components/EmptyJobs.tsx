import * as React from "react";

export const NotFoundList = function() {
  return (
    <div className="not-found-list">
      <div className="box-white">
        <div className="box-white-content">
          <p>😟 Your search returned no matches.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Try similar tags.</li>
            <li>Try different filters.</li>
          </ul>
          <p>If nothing helps, keep looking and never give up.</p>
          <p>
            It also helps to keep studying. They say that luck is when
            opportunity meets preparation.
          </p>
          <p>Your dream job is on the way.</p>
        </div>
      </div>
    </div>
  );
};
