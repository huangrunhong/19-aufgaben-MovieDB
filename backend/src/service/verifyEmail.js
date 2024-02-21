import { User } from "../models/index.js";

export async function verifyEmail({ userId, sixDigitCode }) {
  const user = await User.findById(userId);

  if (!user) throw new Error(`could not find user mit ID ${userId}`);
  user.emailVerified = true;
  await user.save();
  return userToProfileInfo(user);
}

const userToProfileInfo = ({ _id, user_name, bio, photo_url }) => {
  _id, user_name, bio, photo_url;
};
