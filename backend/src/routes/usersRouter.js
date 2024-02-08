import express from "express";
import multer from "multer";

import { userController } from "../controllers/index.js";

const usersRouter = express.Router();
const photosStorage = multer.diskStorage({
  destination: "./userPhotos/",
  filename: (_, file, next) => next(null, file.originalname),
});

const photosMiddleWare = multer({ storage: photosStorage });

usersRouter.post(
  "/register",
  photosMiddleWare.any(),
  userController.registerAccountCtrl
);

export default usersRouter;
