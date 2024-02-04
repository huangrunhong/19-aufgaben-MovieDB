import { Movies } from "../models/index.js";

export async function addMovie(newMovie) {
  return Movies.create(newMovie);
}
