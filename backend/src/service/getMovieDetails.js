import { Movies } from "../models/index.js";

export async function getMovieDetails(movieId) {
  const foundMovie = await Movies.findById(movieId);
  const movieImageURL = foundMovie.poster;
  const newPosterUrl = convertHttpToHttps(movieImageURL);
  foundMovie.poster = newPosterUrl;
  if (!foundMovie) throw new Error("Could not find movie" + movieId);
  return foundMovie;
}
function convertHttpToHttps(url) {
  return url?.replace("http", "https");
}
