import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import FavoriteMovies from "./pages/FavoriteMovies";
import AddMovie from "./pages/AddMovie";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:movieId" element={<MovieDetails />} />
        <Route path="/favorite-movies" element={<FavoriteMovies />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
