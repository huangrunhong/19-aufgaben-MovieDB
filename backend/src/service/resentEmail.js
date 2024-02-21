import { User } from "../models/index.js";
import { sentVerificationEmail } from "../utils/sentVerificationEmail.js";

export async function resentEmail({ userId }) {
  const user = User.findById(userId);
  if (!user) throw new Error(`Could not find user with ID ${userId}`);

  await sentVerificationEmail(user);
  return userToProfileInfo(user);
}

const userToProfileInfo = ({ user_name, email, bio, photo_url }) => {
  user_name, email, bio, photo_url;
};
