import { User } from "../models/index.js";
import crypto from "crypto";

export async function registerUser(userInfo) {
  const password_salt = generateRandomSalt();
  const password_hash = hashPassword(userInfo.password, password_salt);

  const user = new User({
    user_name: userInfo.user_name,
    bio: userInfo.bio,
    email: userInfo.email,
    password_salt: password_salt,
    password_hash: password_hash,
    photo_url: userInfo.photo_url,
  });

  await user.save();
  return user;
}

// 加密password
const hash = (inputPW) =>
  crypto.createHash("sha512").update(inputPW).digest("hex");

const generateRandomSalt = () => crypto.randomBytes(64).toString("base64");

const hashPassword = (password, salt) => hash(`${password}${salt}`);
