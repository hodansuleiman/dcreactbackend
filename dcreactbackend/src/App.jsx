import { useState } from "react";

import Header from "./components/header";
import SearchIcon from "@mui/icons-material/Search";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Quiz1 from "./views/Quiz1";
import Home from "./views/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz1" element={<Quiz1 />} />
      </Routes>
    </>
  );
}
export default App;
