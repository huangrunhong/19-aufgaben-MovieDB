import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routes/moviesRouter.js";
import mongoose from "mongoose";
import morgan from "morgan";
import usersRouter from "./routes/usersRouter.js";
import cookieSession from "cookie-session";

dotenv.config();
const app = express();
const PORT = 9999;
const MONGODB_URL = process.env.MONGODB_URL;
const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

app.set("trust proxy", 1);
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret,
  httpOnly: true,
  expires: new Date(Date.now() + tenDaysInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
console.log(cookieSessionOptions);
app.use(cookieSession(cookieSessionOptions));

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/movies", moviesRouter);
app.use("/users", usersRouter);
app.use(express.static("uploads"));
app.use(express.static("userPhotos"));

const serverListenToPort = () =>
  app.listen(PORT, () => console.log("server at port: ", PORT));

mongoose
  .connect(MONGODB_URL, { dbName: "video" })
  .then(() => {
    console.log("Database connection successful");
    serverListenToPort();
  })
  .catch((err) => {
    console.log("Error connecting to database!");
    console.log(err);
    process.exit();
  });
