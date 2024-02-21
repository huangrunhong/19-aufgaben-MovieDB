import { Link } from "react-router-dom";
import MovieListItem from "../components/MovieListItem";

const FavoriteMovies = ({ movies }) => {
  const favoriteMovies = movies.filter((movie) => movie.liked === true);
  console.log(favoriteMovies);
  const moviesNumber = favoriteMovies.length;
  return (
    <section className="homePage">
      <div className="banner">
        <h1>
          You have <span>{moviesNumber} </span> favorite Movies in total!
        </h1>
      </div>

      <article className="allMovies">
        <h1>Favorite movies</h1>
        <div className="gallery">
          {favoriteMovies ? (
            favoriteMovies.map((movie) => (
              <Link to={`/details/${movie._id}`}>
                <MovieListItem
                  key={movie._id}
                  title={movie.title}
                  director={movie.director}
                  image={movie.poster}
                />
              </Link>
            ))
          ) : (
            <p>Movies are coming!</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default FavoriteMovies;
