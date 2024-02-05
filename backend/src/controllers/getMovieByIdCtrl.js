import { MovieService } from "../service/index.js";

export async function getMovieByIdCtrl(req, res) {
  try {
    const movieId = req.params.movieId;
    const result = await MovieService.getMovieDetails(movieId);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "could not retrieve Movie" });
  }
}
