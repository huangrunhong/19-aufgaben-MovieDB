import express from "express";
import multer from "multer";
import { userController } from "../controllers/index.js";
import { doJwtAuth } from "../middleWare/doJwtAuth.js";

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

usersRouter.post("/login", express.json(), userController.loginUserCtrl);

usersRouter.post("/refreshToken", doJwtAuth, userController.refreshTokenCtrl);

usersRouter.post(
  "/verifyEmail",
  express.json(),
  userController.verifyEmailCtrl
);

usersRouter.post(
  "/resentEmail",
  express.json(),
  userController.resentEmailCtrl
);

usersRouter.post("/logout", doJwtAuth, userController.logoutCtrl);

export default usersRouter;
