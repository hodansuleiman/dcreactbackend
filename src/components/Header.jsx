import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="y-wrap">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
