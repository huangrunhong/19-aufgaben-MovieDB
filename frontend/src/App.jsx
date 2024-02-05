import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:9999/api/movies`);
      const { result, success, error } = await res.json();
      error && console.log(error);
      success && setMovies(result);
    }
    fetchData();
  }, []);
  const searchMovies = async (search) => {
    const res = await fetch(
      `http://localhost:9999/api/movies?search=${search}`
    );
    const { result, success, error } = await res.json();
    error && console.log(error);
    success && setMovies(result);
  };

  const fetchLikedMovies = async (liked) => {
    const res = await fetch(`http://localhost:9999/api/movies?liked=${liked}`);
    const { result, success, error } = await res.json();
    error && console.log(error);
    success && setMovies(result);
  };
  return (
    <BrowserRouter>
      <Header searchMovies={searchMovies} fetchLikedMovies={fetchLikedMovies} />

      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/details/:movieId" element={<MovieDetails />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
