import { Link } from "react-router-dom";

import MovieListItem from "../components/MovieListItem";

import "./Home.scss";
import { useEffect, useState } from "react";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(props.url ?? "http://localhost:9999/api/movies")
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) console.log(error);

        setMovies(result);
      });
  }, []);

  return (
    <section className="homePage">
      <div className="banner">
        <h1>
          MovieMagicDatabase has it all. But you can still <span>add</span> to
          it.
        </h1>
      </div>

      <article className="allMovies">
        <h1>All Movies</h1>
        <div className="gallery">
          {movies ? (
            movies.map((movie) => (
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

export default Home;
