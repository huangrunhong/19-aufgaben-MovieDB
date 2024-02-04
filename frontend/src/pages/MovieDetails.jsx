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
      });
  }, []);

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
            <div
              onClick={addFavoriteMovie}
              className={favorite ? "active" : "noActive"}
            >
              <svg
                width="30"
                height="27"
                viewBox="0 0 30 27"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M27.0881 1.78373C23.8772 -0.93555 19.1019 -0.446428 16.1547 2.57564L15.0004 3.75769L13.8462 2.57564C10.9048 -0.446428 6.12365 -0.93555 2.91277 1.78373C-0.766844 4.90479 -0.9602 10.5064 2.33271 13.8895L13.6704 25.5236C14.4028 26.2747 15.5922 26.2747 16.3246 25.5236L27.6623 13.8895C30.9611 10.5064 30.7677 4.90479 27.0881 1.78373Z"
                />
              </svg>
            </div>
            <div
              onClick={editMovie}
              className={edition ? "active" : "noActive"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="96px"
                height="96px"
              >
                <path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z" />
              </svg>
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
        <img src={movie.poster} alt={movie.title} onError={handleImageError} />
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
