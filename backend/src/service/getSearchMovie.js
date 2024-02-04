import { Movies } from "../models/index.js";

export async function getSearchMovie(movieTitle) {
  const searchMovie = await Movies.find({ title: movieTitle });

  if (!searchMovie) throw new Error("Could not find Movie" + movieTitle);

  return searchMovie;
}
