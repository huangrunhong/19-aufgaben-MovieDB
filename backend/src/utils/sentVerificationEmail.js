import { sentMail } from "./sendMail.js";

export async function sentVerificationEmail(user) {
  console.log("sent mail to", user.email);
  return sentMail(
    user.email,
    "please verify your account",
    `Hello ${user.user_name} , please verify your account by entering this 6 digit code: ${user.sixDigitCode}`
  );
}
