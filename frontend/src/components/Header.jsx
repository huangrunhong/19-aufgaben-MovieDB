import { Link } from "react-router-dom";
import { useState } from "react";

import "./Header.scss";

const Header = ({ searchMovies, fetchLikedMovies }) => {
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(false);

  const getSearchParams = () => {
    const params = new URLSearchParams();

    search && params.append("search", search);
    liked && params.append("liked", liked);

    return "?" + params.toString();
  };

  return (
    <div className="header">
      <Link to="/">
        <h3>MMDb</h3>
      </Link>
      <div className="searchBar">
        <input
          type="text"
          placeholder=" e.g. The Godfather"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={() => searchMovies(search)}>Search</button>
      </div>

      <Link
        to={{ pathname: "/", search: getSearchParams() }}
        onClick={() => {
          const next = !liked;
          setLiked(next);
          fetchLikedMovies(next);
        }}
      >
        <div className={liked ? "favorite" : "notFavorite"}>
          <svg
            width="40"
            height="36"
            viewBox="0 0 30 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M27.0881 1.78373C23.8772 -0.93555 19.1019 -0.446428 16.1547 2.57564L15.0004 3.75769L13.8462 2.57564C10.9048 -0.446428 6.12365 -0.93555 2.91277 1.78373C-0.766844 4.90479 -0.9602 10.5064 2.33271 13.8895L13.6704 25.5236C14.4028 26.2747 15.5922 26.2747 16.3246 25.5236L27.6623 13.8895C30.9611 10.5064 30.7677 4.90479 27.0881 1.78373Z"
            />
          </svg>
        </div>
      </Link>
      <Link to="/add-movie">
        <button>+</button>
      </Link>
    </div>
  );
};

export default Header;
