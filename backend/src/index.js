import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routes/moviesRouter.js";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = 9999;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/movies", moviesRouter);
app.use(express.static("uploads"));

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
