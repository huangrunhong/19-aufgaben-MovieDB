import { MovieService } from "../service/index.js";

export async function deleteMovieByIdCtrl(req, res) {
  try {
    const movieId = req.params.movieId;
    const result = await MovieService.removeMovie(movieId);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Could not add Movie" });
  }
}
