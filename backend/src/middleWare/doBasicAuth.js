// import { User } from "../models/index.js";
// import { hashPassword } from "../utils/hash.js";

// export async function doBasicAuth(req, res, next) {
//   const invalidAuthRes = (message) =>
//     res
//       .status(401)
//       .json({ success: false, message: message || "Invalid authentication" });

//   const authorization = req.headers.authorization;
//   if (!authorization) invalidAuthRes();
//   const [authType, authDataBase64] = authorization.split(" ");
//   if (authType !== "Basic" || !authDataBase64) return invalidAuthRes();

//   const authData = Buffer.from(authDataBase64, "base64").toString();
//   const [email, password] = authData.split(":");
//   if (!email || !password) return invalidAuthRes();

//   const foundUser = await User.findOne({ email });
//   if (!foundUser) return invalidAuthRes();

//   const password_hash = hashPassword(password, foundUser.password_salt);
//   const correct = password_hash === foundUser.password_hash;
//   if (!correct) return invalidAuthRes("wrong password");

//   req.authenticatedUser = foundUser;
//   next();
// }
