import { User } from "../models/index.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { sentMail } from "../utils/sendMail.js";
import { sentVerificationEmail } from "../utils/sentVerificationEmail.js";

export async function registerUser(userInfo) {
  const sixDigitCode = generateRandomSixDigitCode();
  const password_salt = generateRandomSalt();
  const password_hash = hashPassword(userInfo.password, password_salt);
  const user = new User({
    user_name: userInfo.userName,
    bio: userInfo.bio,
    email: userInfo.email,
    password_salt: password_salt,
    password_hash: password_hash,
    // photo_url: userInfo.photo_url,
    sixDigitCode,
    emailVerified: false,
  });
  // console.log(user);
  await user.save();
  await sentVerificationEmail(user);

  return userToProfileInfo(user);
}

const userToProfileInfo = ({ _id, user_name, email, bio }) => {
  return {
    _id,
    user_name,
    email,
    bio,
  };
};
const generateRandomSixDigitCode = () => Math.random().toString().slice(2, 8);
