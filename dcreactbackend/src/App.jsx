import { useState } from "react";
import Countries from "./components/countries";
import Header from "./components/header";
import SearchIcon from "@mui/icons-material/Search";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <div className="inputs">
          <div className="search-input">
            <SearchIcon />
            <input type="text" placeholder="Search for a country..." />
          </div>
          <div className="select_region">
            <select>
              <option>All</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </div>
      </div>
      <Countries />
    </div>
  );
}
export default App;
