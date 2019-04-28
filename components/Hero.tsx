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
            🙋‍♀️ Hey there! Remoted is a remote job aggregator. I made 🤖 bots
            that constantly search{" "}
            <a href="https://www.stackoverflow.com">StackOverflow</a>,{" "}
            <a href="https://www.weworkremotely.com">We Work Remotely</a> and{" "}
            <a href="https://authenticjobs.com/">Authentic Jobs</a> for IT
            related remote jobs, meaning jobs you can work from home, co-working
            spaces, coffee shops, you name it.
          </p>
          <p>
            💗 Remoted is cool because of the search options. Remote jobs often
            impose limitations on your location. Some require you to be on a
            specific range of time zones. Other require you to be in specific
            countries.
          </p>
          <p>
            When you choose 🌐 Work Anywhere, I'll do my best to only show jobs
            you can be anywhere.
          </p>
          <p>
            When you choose 💰 With Salary, I'll only display jobs that list the
            salary range.
          </p>
          <p>
            When you choose, for example, 🔖 Stackoverflow, I'll only display
            jobs that came from Stackoverflow.
          </p>
          <p>
            When you choose, for example, 🌎 No "US Only", I 'll exclude jobs
            that I know require you to be in the US.
          </p>
          <p>
            💔 If there is something you think should be better, please{" "}
            <a href="https://github.com/remoted-io/remoted/issues">
              let me know
            </a>{" "}
            creating an issue!
          </p>
          <p>
            Thank you and please come back!{" "}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Close this thing!
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

// <i className="fas fa-plus more"/>
