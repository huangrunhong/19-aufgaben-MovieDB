import { MovieService } from "../service/index.js";

export async function getAllMoviesCtrl(req, res) {
  try {
    let result;
    const search = req.query.search;
    const liked = req.query.liked === "true";

    if (liked) {
      result = await MovieService.getAllMovies({ liked: true });
    } else if (search) {
      result = await MovieService.getAllMovies({
        title: new RegExp(search, "i"),
      });
    } else result = await MovieService.getAllMovies();

    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error || "could not retrieve movies",
    });
  }
}
