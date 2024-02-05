import { addNewFavoriteMovieCtrl } from "./addNewFavoriteMovieCtrl.js";
import { deleteMovieByIdCtrl } from "./deleteMovieByIdCtrl.js";
import { editMovieByIdCtrl } from "./editMovieByIdCtrl.js";
import { getAllMoviesCtrl } from "./getAllMoviesCtrl.js";
import { getMovieByIdCtrl } from "./getMovieByIdCtrl.js";
import { postNewMovieCtrl } from "./postNewMovieCtrl.js";

export const movieController = {
  getAllMoviesCtrl,
  getMovieByIdCtrl,
  postNewMovieCtrl,
  deleteMovieByIdCtrl,
  editMovieByIdCtrl,
  addNewFavoriteMovieCtrl,
};
