import { Movies } from "../models/index.js";

export async function removeMovie(MovieId) {
  const deletedMovie = await Movies.findByIdAndDelete(MovieId);
  return deletedMovie;
}
