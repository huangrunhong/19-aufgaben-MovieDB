import "./AddMovie.scss";
import MovieForm from "../components/MovieForm";

const AddMovie = () => {
  return (
    <section className="addMovie">
      <div className="banner">
        <h1>
          Add your <span>OWN</span> movies
        </h1>
      </div>

      <MovieForm action="http://localhost:9999/api/movies" />
    </section>
  );
};

export default AddMovie;
