import { addMovie } from "./addMovie.js";
import { editMovie, toggleLikedMovie } from "./editMovie.js";
import { getAllMovies } from "./getAllMovies.js";
import { getMovieDetails } from "./getMovieDetails.js";
import { getSearchMovie } from "./getSearchMovie.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { registerUser } from "./registerUser.js";
import { removeMovie } from "./removeMovie.js";
import { resentEmail } from "./resentEmail.js";
import { verifyEmail } from "./verifyEmail.js";

export const MovieService = {
  getAllMovies,
  getMovieDetails,
  getSearchMovie,
  addMovie,
  removeMovie,
  editMovie,
  toggleLikedMovie,
};

export const UserService = {
  registerUser,
  refreshToken,
  verifyEmail,
  resentEmail,
  loginUser,
};
