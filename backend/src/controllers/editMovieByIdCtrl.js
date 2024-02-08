import { MovieService } from "../service/index.js";

export async function editMovieByIdCtrl(req, res) {
  try {
    const movieId = req.params.movieId;
    const editedMovie = req.body;

    const result = await MovieService.editMovie(movieId, editedMovie);
    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Could not add Movie" });
  }
}
