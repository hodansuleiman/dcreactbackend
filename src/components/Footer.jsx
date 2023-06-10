import React from "react";
import { NavLink } from "react-router-dom";
import insta from "../Images/instagram.png";
import twitter from "../Images/twitter.png";
import youtube from "../Images/youtube.png";

const Footer = () => {
  return (
    <footer>
      <div className="y-wrap">
        <div>
          <img src={insta} />
        </div>
        <div>
          <img src={twitter} />
        </div>
        <div>
          <img src={youtube} />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
