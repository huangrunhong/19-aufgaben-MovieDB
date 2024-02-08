import { addNewFavoriteMovieCtrl } from "./addNewFavoriteMovieCtrl.js";
import { deleteMovieByIdCtrl } from "./deleteMovieByIdCtrl.js";
import { editMovieByIdCtrl } from "./editMovieByIdCtrl.js";
import { getAllMoviesCtrl } from "./getAllMoviesCtrl.js";
import { getMovieByIdCtrl } from "./getMovieByIdCtrl.js";
import { postNewMovieCtrl } from "./postNewMovieCtrl.js";
import { registerAccountCtrl } from "./registerAccountCtrl.js";

export const movieController = {
  getAllMoviesCtrl,
  getMovieByIdCtrl,
  postNewMovieCtrl,
  deleteMovieByIdCtrl,
  editMovieByIdCtrl,
  addNewFavoriteMovieCtrl,
};

export const userController = {
  registerAccountCtrl,
};
