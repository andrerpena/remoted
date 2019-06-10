import { config } from "dotenv";
import { sendEmail } from "./server/mail";

config();
sendEmail()
  .then(() => {
    console.log("awesome");
  })
  .catch(ex => {
    console.log(ex);
  });
