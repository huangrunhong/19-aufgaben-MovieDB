import express from "express";
import multer from "multer";
import { MovieService } from "../service/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", async function getAllMoviesCtrl(req, res) {
  try {
    const result = await MovieService.getAllMovies();

    res.json({ success: true, result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error || "could not retrieve movies",
    });
  }
});

moviesRouter.get(
  "/details/:movieId",
  async function getMovieByIdCtrl(req, res) {
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
);

moviesRouter.get("/", async function getMovieBySearchCtrl(req, res) {
  try {
    const movieTitle = req.body.titleSearch;
    const result = await MovieService.getMovieBySearchCtrl(movieTitle);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "could not retrieve Movie" });
  }
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, next) => {
    next(null, file.originalname);
  },
});

const uploadMiddleWare = multer({ storage: storage });
moviesRouter.post(
  "/",
  uploadMiddleWare.any(),
  async function postNewMovie(req, res) {
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
);

moviesRouter.delete(
  "/details/:movieId",
  async function deleteMovieByIdCtrl(req, res) {
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
);

moviesRouter.post(
  "/details/:movieId",
  uploadMiddleWare.any(),
  async function editMovieByIdCtrl(req, res) {
    try {
      const movieId = req.params.movieId;
      const editedMovie = req.body;
      console.log(editedMovie);
      const result = await MovieService.editMovie(movieId, editedMovie);
      res.json({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error, message: "Could not add Movie" });
    }
  }
);

moviesRouter.get(
  "/favorites",
  async function getAllFavoriteMoviesCtrl(req, res) {
    try {
      const result = await MovieService.getAllMovies({ liked: true });
      console.log(result);
      res.json({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, error, message: "Could not add Movie" });
    }
  }
);

moviesRouter.post(
  "/favorites/:movieId",
  async function addFavoriteMovieCtrl(req, res) {
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
);

export default moviesRouter;
