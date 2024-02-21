import { Link } from "react-router-dom";
import { useState } from "react";

import "./Header.scss";

const Header = ({
  searchMovies,
  fetchLikedMovies,
  userProfileInfo,
  onLogout,
}) => {
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(false);

  console.log(userProfileInfo);
  const getSearchParams = () => {
    const params = new URLSearchParams();

    search && params.append("search", search);
    liked && params.append("liked", liked);

    return "?" + params.toString();
  };

  async function doLogout() {
    const res = await fetch("http://localhost:9999/users/logout", {
      method: "POST",
      credentials: "include",
    });

    const { success } = await res.json();
    if (!success) alert("could not logout");
    onLogout();
  }

  return (
    <section className="header">
      <Link to="/">
        <h3>MMDb</h3>
      </Link>

      <article className="navBarRight">
        <div className="searchBar">
          <input
            type="text"
            placeholder=" e.g. The Godfather"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button onClick={() => searchMovies(search, setSearch)}>
            Search
          </button>
        </div>
        <div className="personalPermissions">
          {/* <Link
            to={{ pathname: "/", search: getSearchParams() }}
            onClick={() => {
              const next = !liked;
              setLiked(next);
              fetchLikedMovies(next);
            }}
          ></Link> */}
          {userProfileInfo ? (
            <Link to="/favorite">
              <i class="ri-star-fill"></i>
            </Link>
          ) : (
            <></>
          )}
          {userProfileInfo ? (
            <Link to="/add-movie">
              <i class="ri-add-box-fill"></i>
            </Link>
          ) : (
            <></>
          )}

          {userProfileInfo ? (
            <div onClick={doLogout}>
              <i className="ri-logout-box-r-line"></i>
            </div>
          ) : (
            <Link to="/login">
              <i className="ri-login-box-line"></i>
            </Link>
          )}
        </div>
      </article>
    </section>
  );
};

export default Header;
