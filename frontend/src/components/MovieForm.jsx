import { useEffect, useState } from "react";
import "./MovieForm.scss";

const MovieForm = (props) => {
  const [title, setTitle] = useState(props.title || "");
  const [year, setYear] = useState(props.year || "");
  const [director, setDirector] = useState(props.director || "");
  const [genre, setGenre] = useState(props.genre || "");
  const [rate, setRate] = useState(props.rate || "");
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState(props.description || "");
  //   const [movie, setMovie] = useState({});
  useEffect(() => {
    setTitle(props.title);
    setYear(props.year);
    setDirector(props.director);
    setGenre(props.genre);
    setRate(props.rate);
    setDescription(props.description);
  }, [props.title]);

  const addMovie = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("director", director);
    formData.append("genres", genre);
    formData.append("rating", rate);
    formData.append("description", description);
    if (poster) {
      formData.append("poster", poster, poster.name);
    }

    fetch(props.action, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) console.log(error);
        // else setMovie(result);

        setTitle("");
        setYear("");
        setDirector("");
        setGenre("");
        setRate("");
        setDescription("");
      });
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(event) => setYear(event.target.value)}
      />
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(event) => setDirector(event.target.value)}
      />
      <input
        type="text"
        placeholder="Genre1, Genre2, ..."
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      />
      <input
        type="number"
        placeholder="Rate"
        value={rate}
        onChange={(event) => setRate(event.target.value)}
      />
      <input
        type="file"
        placeholder="URL for movie poster"
        onChange={(event) => setPoster(event.target.files[0])}
      />
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <button onClick={addMovie}>Submit</button>
    </div>
  );
};

export default MovieForm;
