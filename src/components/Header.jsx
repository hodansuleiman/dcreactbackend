import React from "react";
import { NavLink } from "react-router-dom";

// import DarkModeIcon from "@mui/icons-material/DarkMode";

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

// const header = () => {
//   return (
//     <div className="header">
//       <div className="header_container">
//         <h2 className="logo">Where in the world</h2>
//         <div className="switch_mode">
//           <DarkModeIcon />
//           <h3>Dark Mode</h3>
//         </div>
//       </div>
//     </div>
//   );
// };
