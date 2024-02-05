import express from "express";
import multer from "multer";

import { movieController } from "../controllers/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", movieController.getAllMoviesCtrl);

moviesRouter.get("/details/:movieId", movieController.getMovieByIdCtrl);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_, file, next) => {
    next(null, file.originalname);
  },
});

const uploadMiddleWare = multer({ storage: storage });

moviesRouter.post(
  "/",
  uploadMiddleWare.any(),
  movieController.postNewMovieCtrl
);

moviesRouter.delete("/details/:movieId", movieController.deleteMovieByIdCtrl);

moviesRouter.post(
  "/details/:movieId",
  uploadMiddleWare.any(),
  movieController.editMovieByIdCtrl
);

//moviesRouter.get("/favorites", movieController.getAllFavoriteMoviesCtrl);

moviesRouter.post(
  "/favorites/:movieId",
  movieController.addNewFavoriteMovieCtrl
);

export default moviesRouter;
