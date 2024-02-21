import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import film from "../images/film.jpg";
import "./MovieDetails.scss";
import MovieForm from "../components/MovieForm";

const MovieDetails = () => {
  const params = useParams();

  const [movie, setMovie] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [edition, setEdition] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:9999/api/movies/details/${params.movieId}`)
      .then((res) => res.json())
      .then(({ result, success, error }) => {
        if (!success) console.log(error);
        setMovie(result);
        setFavorite(result.liked);
      });
  }, []);
  console.log(favorite);
  const addFavoriteMovie = () => {
    fetch(`http://localhost:9999/api/movies/favorites/${params.movieId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ result, success, error }) => {
        if (!success) console.log(error);
        setFavorite(result.liked);
      });
  };

  const editMovie = () => setEdition(!edition);

  const handleImageError = (e) => (e.target.src = film);

  return (
    <section className="detailsPage">
      <article className="part1">
        <div className="titleLine">
          <h2>{movie.title}</h2>
          <div className="buttons">
            <div onClick={addFavoriteMovie}>
              {favorite ? (
                <i class="ri-star-fill"></i>
              ) : (
                <i class="ri-star-line"></i>
              )}
            </div>
            <div onClick={editMovie}>
              {edition ? (
                <i class="ri-edit-box-fill"></i>
              ) : (
                <i class="ri-edit-box-line"></i>
              )}
            </div>
          </div>
        </div>
        <h4>
          {movie.year} | {movie.director}
        </h4>
        <h4>Rating: {movie?.tomato?.rating} </h4>
        <h4>Duration: {movie.runtime} min</h4>
      </article>
      <article className="part2">
        <div className="detailsPoster">
          <img
            src={movie.poster}
            alt={movie.title}
            onError={handleImageError}
          />
        </div>
        <div className="text">
          <div className="genres">
            {movie.genres?.map((genre) => (
              <h5 key={uuidv4()}>{genre} </h5>
            ))}
          </div>
          <h2>{movie.type}</h2>
          <p>{movie.plot}</p>
        </div>
      </article>
      {edition && (
        <MovieForm
          action={`http://localhost:9999/api/movies/details/${params.movieId}`}
          title={movie.title}
          year={movie.year}
          director={movie.director}
          genre={movie.genres}
          rate={movie?.tomato?.rating}
          description={movie.description}
        />
      )}
    </section>
  );
};

export default MovieDetails;
