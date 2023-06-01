import React from "react";
import { Link } from "react-router-dom";

const QuizGame = () => {
  // Implement the quiz game logic here

  return (
    <div>
      <h1>Quiz Game</h1>
      <nav>
        <ul>
          <li>
            <Link to="/quiz1">Quiz 1</Link>
          </li>
          <li>
            <Link to="/quiz2">Quiz 2</Link>
          </li>
          <li>
            <Link to="/quiz3">Quiz 3</Link>
          </li>
          <li>
            <Link to="/quiz4">Quiz 4</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuizGame;
