import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
  const foundUser = await User.findOne({ email });

  if (!foundUser)
    throw new Error(`User with this email ${email} does not exist`);
  if (!foundUser.emailVerified)
    throw new Error(`Email ${email} is not verified`);

  const password_hash = hashPassword(password, foundUser.password_salt);

  const istPasswordCorrect = password_hash === foundUser.password_hash;

  if (!istPasswordCorrect) throw new Error("password is wrong");

  const accessToken = createToken(foundUser, "access");
  const refreshToken = createToken(foundUser, "refresh");
  return {
    user: userToProfileInfo(foundUser),
    tokens: { refreshToken, accessToken },
  };
}
const userToProfileInfo = ({ user_name, email, bio, photo_url }) => {
  return { user_name, email, bio, photo_url };
};
