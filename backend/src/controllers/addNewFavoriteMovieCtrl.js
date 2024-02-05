import { MovieService } from "../service/index.js";

export async function addNewFavoriteMovieCtrl(req, res) {
  try {
    const movieId = req.params.movieId;
    const result = await MovieService.toggleLikedMovie(movieId);
    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Could not add Movie" });
  }
}
