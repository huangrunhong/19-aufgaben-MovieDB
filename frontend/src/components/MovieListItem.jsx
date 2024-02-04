import film from "../images/film.jpg";
const handleImageError = (e) => (e.target.src = film);
const MovieListItem = ({ title, director, image }) => {
  return (
    <div>
      <img src={image} alt={title} onError={handleImageError} />
      <h5>{title} </h5>
      <h5>{director}</h5>
    </div>
  );
};

export default MovieListItem;
