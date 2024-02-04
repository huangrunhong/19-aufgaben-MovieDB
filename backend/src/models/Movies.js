import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  poster: String,
  genres: [String],
  year: Number,
  runtime: Number,
  plot: String,
  tomato: { rating: { type: Number } },
  liked: Boolean,
});

export const Movies = mongoose.model("Movie", movieSchema, "movieDetails");
