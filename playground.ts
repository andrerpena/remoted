import { config } from "dotenv";
config();
import { uploadFromUrl } from "./lib/storage";

console.log("cool");

uploadFromUrl(
  "dev/remoted/companies/company-z",
  "https://www.gravatar.com/avatar/94f82044a85148fec3e5443253dfaaca?s=32&d=identicon&r=PG"
).then(data => {
  console.log(data);
});
