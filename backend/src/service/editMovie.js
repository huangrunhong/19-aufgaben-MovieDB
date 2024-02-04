import { Movies } from "../models/index.js";

export async function editMovie(movieId, editedMovie) {
  const movie = await Movies.findById(movieId);
  movie.title = editedMovie.title ?? movie.title;
  movie.director = editedMovie.director ?? movie.director;
  movie.poster = editedMovie.poster ?? movie.poster;
  movie.genres = editedMovie.genres ?? movie.genres;
  movie.year = editedMovie.year ?? movie.year;
  movie.runtime = editedMovie.runtime ?? movie.runtime;
  movie.plot = editedMovie.plot ?? movie.plot;
  movie.tomato = editedMovie.tomato ?? movie.tomato;
  movie.liked = editedMovie.liked ?? movie.liked;
  // console.log(editedMovie);
  return movie.save();
}

export async function toggleLikedMovie(movieId) {
  const movie = await Movies.findById(movieId);
  movie.liked = !movie.liked;
  return movie.save();
}
