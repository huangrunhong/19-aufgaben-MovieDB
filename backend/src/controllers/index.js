import { addNewFavoriteMovieCtrl } from "./addNewFavoriteMovieCtrl.js";
import { deleteMovieByIdCtrl } from "./deleteMovieByIdCtrl.js";
import { editMovieByIdCtrl } from "./editMovieByIdCtrl.js";
import { getAllMoviesCtrl } from "./getAllMoviesCtrl.js";
import { getMovieByIdCtrl } from "./getMovieByIdCtrl.js";
import { loginUserCtrl } from "./loginUserCtrl.js";
import { logoutCtrl } from "./logoutCtrl.js";
import { postNewMovieCtrl } from "./postNewMovieCtrl.js";
import { refreshTokenCtrl } from "./refreshTokenCtrl.js";
import { registerAccountCtrl } from "./registerAccountCtrl.js";
import { resentEmailCtrl } from "./resentEmailCtrl.js";
import { verifyEmailCtrl } from "./verifyEmailCtrl.js";

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
  loginUserCtrl,
  refreshTokenCtrl,
  verifyEmailCtrl,
  resentEmailCtrl,
  logoutCtrl,
};
