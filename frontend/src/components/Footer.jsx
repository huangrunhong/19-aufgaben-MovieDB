import facebook from "../images/facebook.svg";
import youtube from "../images/youtube.svg";
import heart from "../images/heart.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <h4>Imprint</h4>
      <h4>
        Made with love in heart and popcorn in tummy.{" "}
        <img src={heart} alt="heart" />
      </h4>
      <div>
        <img src={youtube} alt="youtube" />
        <img src={facebook} alt="facebook" />
      </div>
    </div>
  );
};

export default Footer;
