import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: { type: String },
  bio: String,
  email: { type: String },
  password_hash: { type: String, required: true },
  password_salt: { type: String, required: true },
  photo_url: String,
  sixDigitCode: { type: String },
  emailVerified: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema, "users");
