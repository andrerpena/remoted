import * as slack from "slack";
import { config } from "dotenv";
import { RemotedDatabase } from "./db/model";
import { getJob } from "./graphql/services/job-service";
import { linkToJobCanonical } from "../lib/common/url";
import { getCompanyByJobPublicId } from "./graphql/services/company-service";

config();

const token = process.env.SLACK_BOT_TOKEN;

export interface PostOnSlackOptions {
  channel: string;
  text: string;
  attachmentText: string;
  companyName: string;
  companyImageUrl: string;
  originApplyUrl: string;
}

export async function getPostOnSlackOptions(
  db: RemotedDatabase,
  jobPublicId: string
): Promise<PostOnSlackOptions | null> {
  const job = await getJob(db, jobPublicId);
  if (!job) {
    return null;
  }
  const company = await getCompanyByJobPublicId(db, job.id);
  if (!company) {
    return null;
  }
  return {
    text: `New job: https://remoted.io${linkToJobCanonical(job.id)}`,
    attachmentText: `${job.title} at ${
      company.displayName
    }. Tags: ${job.tags.join(", ")}`,
    channel: "jobs-all",
    companyImageUrl: company.imageUrl || "",
    companyName: company.displayName,
    originApplyUrl: job.url
  };
}

export async function postJobOnSlack(options: PostOnSlackOptions) {
  if (process.env.SLACK_ENABLED === "true") {
    return slack.chat.postMessage({
      token,
      channel: options.channel,
      text: options.text,
      icon_url: options.companyImageUrl,
      as_user: false,
      username: options.companyName,
      attachments: [
        {
          text: options.attachmentText,
          actions: [
            {
              type: "button",
              text: "⚡ Apply for this job",
              url: options.originApplyUrl
            }
          ]
        }
      ]
    });
  }
}
