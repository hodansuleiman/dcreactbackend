import { useState } from "react";

import Header from "./components/header";
import SearchIcon from "@mui/icons-material/Search";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import QuizGame from "./components/Quizpage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizGame />} />
      </Routes>
    </>
  );
}
export default App;
