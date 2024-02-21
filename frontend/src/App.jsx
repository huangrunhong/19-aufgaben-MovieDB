import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import LoadingWrapper from "./components/LoadingWrapper";

import "remixicon/fonts/remixicon.css";
import "./App.scss";
import FavoriteMovies from "./pages/FavoriteMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [authorization, setAuthorization] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:9999/api/movies`);
      const { result, success, error } = await res.json();
      error && console.log(error);
      success && setMovies(result);
    }
    fetchData();
  }, []);
  const searchMovies = async (search, setSearch) => {
    const res = await fetch(
      `http://localhost:9999/api/movies?search=${search}`
    );
    const { result, success, error } = await res.json();
    error && console.log(error);
    success && setMovies(result);
    setSearch("");
  };

  const fetchLikedMovies = async (liked) => {
    const res = await fetch(`http://localhost:9999/api/movies?liked=${liked}`);
    const { result, success, error } = await res.json();
    error && console.log(error);
    success && setMovies(result);
  };
  return (
    <BrowserRouter>
      <Header
        searchMovies={searchMovies}
        fetchLikedMovies={fetchLikedMovies}
        userProfileInfo={userProfileInfo}
        onLogout={() => {
          setAuthorization(null);
          setUserProfileInfo(null);
        }}
      />

      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route
          path="/details/:movieId"
          element={
            <LoadingWrapper
              authorization={authorization}
              saveAuthorization={(auth) => setAuthorization(auth)}
            >
              <MovieDetails />
            </LoadingWrapper>
          }
        />

        <Route
          path="/favorite"
          element={
            <LoadingWrapper
              authorization={authorization}
              saveAuthorization={(auth) => setAuthorization(auth)}
            >
              <FavoriteMovies movies={movies} />
            </LoadingWrapper>
          }
        />
        <Route
          path="/add-movie"
          element={
            <LoadingWrapper
              authorization={authorization}
              saveAuthorization={(auth) => setAuthorization(auth)}
            >
              <AddMovie
                authorization={authorization}
                userProfileInfo={userProfileInfo}
              />
            </LoadingWrapper>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              onLoginSuccess={(authorization, userProfileInfo) => {
                setAuthorization(authorization);
                setUserProfileInfo(userProfileInfo);
              }}
            />
          }
        />
        <Route path="/verify-email/:userId" element={<VerifyEmail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
