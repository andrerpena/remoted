// import * as slack from "slack";
// import { config } from "dotenv";
//
// config();
//
// const token = process.env.SLACK_BOT_TOKEN;
//
// (async () => {
//   await slack.chat.postMessage({
//     token,
//     channel: "jobs-all",
//     text: "This is cool! https://remoted.io/job/51val-remote-ruby-on-rails-engineer-uk-remote-safeguarding-monitor",
//     icon_url: "https://remoted.sfo2.cdn.digitaloceanspaces.com/prod/remoted/companies/tme13-shiphero.png",
//     as_user: false,
//     username: "Hooo",
//     attachments: [{
//       "text": "Optional text that appears within the attachment",
//       "thumb_url": "https://remoted.sfo2.cdn.digitaloceanspaces.com/prod/remoted/companies/tme13-shiphero.png",
//       "actions": [
//         {
//           "type": "button",
//           "text": "Book flights 🛫",
//           "url": "https://flights.example.com/book/r123456"
//         }
//       ]
//     }]
//   });
//
// })().then(() => {
//   console.log("awesome");
// });
