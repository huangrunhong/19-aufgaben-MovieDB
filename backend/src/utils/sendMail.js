import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID =
  "66502925738-uoj116gosg5kn3tl4e7qksqchs1uh5co.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04TApWBKz1Gn7CgYIARAAGAQSNwF-L9IrCdzb0pTL9ZWiNZPixK5H7rUuiCjXhPmwhPUWD7wPOA0rZ_0ZjUidTJy6JlGDIHDmwU4";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sentMail(to, subject, text) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "huang.run.hong.1986@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const sentMessage = await transport.sendMail({
      from: "Runhong <huang.run.hong.1986@gmail.com>",
      to,
      subject,
      text,
      html: text,
    });

    const success = sentMessage.accepted.includes(to);
    return success;
  } catch (error) {
    console.log(error);
    return false;
  }
}
