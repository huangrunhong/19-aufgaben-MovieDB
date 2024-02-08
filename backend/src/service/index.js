import { addMovie } from "./addMovie.js";
import { editMovie, toggleLikedMovie } from "./editMovie.js";
import { getAllMovies } from "./getAllMovies.js";
import { getMovieDetails } from "./getMovieDetails.js";
import { getSearchMovie } from "./getSearchMovie.js";
import { registerUser } from "./registerUser.js";
import { removeMovie } from "./removeMovie.js";

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
};
