import * as sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();

const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || "";
if (!SENDGRID_API_KEY) {
  throw new Error("Could not read SENDGRID_API_KEY from Env file");
}

export async function sendEmail() {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: "andrerpena@gmail.com",
    from: "remoted@remoted.io",
    subject: "Hello from remoted!",
    text: "This us cool!",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  return sgMail.send(msg);
}
