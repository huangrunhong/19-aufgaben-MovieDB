import { Movies } from "../models/index.js";

export async function getAllMovies(query) {
  const movies = await Movies.find(query);
  return movies.map((movie) => {
    const movieImageURL = movie.poster;
    const newPosterUrl = convertHttpToHttps(movieImageURL);
    movie.poster = newPosterUrl;
    return movie;
  });
}

function convertHttpToHttps(url) {
  return url?.replace("http", "https");
}
