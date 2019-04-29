import * as React from "react";
import { Logo } from "./Logo";
import * as classNames from "classnames";

export const Hero: React.FunctionComponent<{}> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="hero">
      <div className="logo-wrapper">
        <Logo size={"large"} />
      </div>
      <div className="description">
        <span>The workplace is going borderless. Go remoted.</span>
        <span className="learn-more" onClick={() => setOpen(!open)}>
          <i className={classNames("fas", open ? "fa-times" : "fa-plus")} />
          {open ? "Learn less" : "Learn more"}.
        </span>
      </div>
      {open && (
        <div className="notification">
          <button
            className="delete"
            onClick={e => {
              e.preventDefault();
              setOpen(false);
            }}
          />
          <p>
            🙋‍♀️ Hey there! Remoted is a remote job aggregator. It has 🤖 bots
            that constantly search the web looking for remote jobs. Remote jobs
            are jobs you can work from home, co-working spaces, coffee shops,
            you name it.
          </p>
          <p>
            💗 Remoted is strong because of the search options. Remote jobs
            often impose limitations on your location. Some require the
            candidate to be in a specific range of time zones, others only
            accept applicants from certain countries.
          </p>
          <p>
            🕵️‍♀️ In order to filter jobs, all you have to do is to select a tag
            and/or click on the filter buttons. The filters are automatically
            applied.
          </p>
          <p>
            When you choose 🌐Work Anywhere, only jobs without detected location
            restrictions will be displayed.
          </p>
          <p>
            When you choose 💰With Salary, only jobs that list salary details
            will be displayed.
          </p>
          <p>
            When you choose sources, for example, 🔖Stackoverflow, only jobs
            from those sources will be displayed.
          </p>
          <p>
            It is also possible to exclude jobs that require the candidate to be
            a particular region. For example, When you choose, 🌎No "US Only",
            jobs that require the candidate to be in the United States will be
            excluded. Remoted offers filters for the most popular location
            restrictions.
          </p>
          <p>
            💔 If there is something you think should be better, please{" "}
            <a href="https://github.com/remoted-io/remoted/issues">
              let me know by creating an issue
            </a>{" "}
            .
          </p>
          <p>Thank you and I hope you find the perfect job! </p>
          <p>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              ❌ Ok. Thanks.
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

// <i className="fas fa-plus more"/>
