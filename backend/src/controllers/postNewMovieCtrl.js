import { MovieService } from "../service/index.js";

export async function postNewMovieCtrl(req, res) {
  try {
    const newMovie = req.body;

    newMovie.tomato = { rating: Number(newMovie.rating) };
    newMovie.genres = newMovie.genres.split(",");
    newMovie.poster = `http://localhost:9999/${req.files[0].originalname}`;
    console.log(newMovie.poster);

    const result = await MovieService.addMovie(newMovie);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Could not add Movie" });
  }
}
