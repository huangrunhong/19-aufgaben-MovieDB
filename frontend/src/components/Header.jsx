import Button from "./Button";
import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <h3>MMDb</h3>
      </Link>
      <div className="searchBar">
        <input type="text" placeholder=" e.g. The Godfather" />
        <Button name="Search" />
      </div>
      <Link to="/favorite-movies">
        <div className="favorite">
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
        <Button name="+" />
      </Link>
    </div>
  );
};

export default Header;
