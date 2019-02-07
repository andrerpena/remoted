import { Job } from "../server/model";
import * as React from "react";
import "./JobPost.scss";

export const JobPost = (props: Job) => (
  <li className="job-post">
    <figure className="job-post-image">
      <img src="https://ph-files.imgix.net/9196e189-287f-4381-ad38-f8b422b90789?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2%202x,%20https://ph-files.imgix.net/9196e189-287f-4381-ad38-f8b422b90789?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=3%203x" />
    </figure>
    <div className="job-post-body">
      <div>
        <h5 className="title is-5">{props.title}</h5>
      </div>
      <div className="job-post-body-more-info">Microsoft · 2d ago</div>
      <div className="job-post-tags">
        <div className="tags left">
          <span className="tag is-white">Primary</span>
          <span className="tag is-white">asp.net</span>
          <span className="tag is-white">css</span>
          <span className="tag is-white">html</span>
        </div>
        <div className="tags right">
          <span className="tag save is-light">
            save as <i className="far fa-heart" />
          </span>
          <span className="tag apply is-light">
            apply <i className="fas fa-check" />
          </span>
        </div>
      </div>
    </div>
  </li>
);
