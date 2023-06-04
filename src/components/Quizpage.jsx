import React from "react";
import { Link } from "react-router-dom";
import dataA from "../data/dataA.json";
import dataB from "../data/dataB.json";
import dataC from "../data/dataC.json";
import dataD from "../data/dataD.json";
import dataE from "../data/dataE.json";
import { useEffect, useState } from "react";

const QuizPage = () => {
  const [quizQ, setQuizQ] = useState([]);
  const [quizA, setQuizA] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [quizType, setQuizType] = useState(0);

  const nextGame = () => {
    setStartIndex(startIndex + 4 * quizType);
    setEndIndex(endIndex + 4 * quizType);

    console.log("start quizType", quizType);

    if (quizType == 4) {
      //end game
      console.log("end game");
    } else {
      getData();
      setQuizType(quizType + 1);
    }
  };

  const btnHandler = () => {
    console.log("click");
    nextGame();

    //0 name - flags
    //1 capital - region -
    //2 capital - name
    //3 name - population
    //4 end screen
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const getData = async () => {
    const url = `https://restcountries.com/v3.1/all`;
    const response = await fetch(url);
    const data = await response.json();

    let tempQuizQ = [];
    let tempQuizA = [];

    for (let i = 0; i < endIndex; i++) {
      if (i >= startIndex && i < endIndex) {
        console.log("i am adding");
        switch (quizType) {
          case 0:
            tempQuizQ.push({
              id: i,
              pairsWith: i,
              title: `What is the flag for ${data[i].name.common}?`,
              text: data[i].name.common,
            });

            tempQuizA.push({
              id: i,
              pairsWith: i,
              title: "flag",
              img: data[i].flags.png,
            });
            break;
          case 1:
            tempQuizQ.push({
              id: i,
              pairsWith: i,
              title: "capital",
              text: data[i].capital,
            });

            tempQuizA.push({
              id: i,
              pairsWith: i,
              title: "region",
              text: data[i].region,
            });
            break;
          case 2:
            tempQuizQ.push({
              id: i,
              pairsWith: i,
              title: "capital",
              text: data[i].capital,
            });

            tempQuizA.push({
              id: i,
              pairsWith: i,
              title: "country",
              text: data[i].name.common,
            });
            break;
          case 3:
            tempQuizQ.push({
              id: i,
              pairsWith: i,
              title: "country",
              text: data[i].name.common,
            });

            tempQuizA.push({
              id: i,
              pairsWith: i,
              title: "population",
              text: data[i].population,
            });
            break;

          default:
          // code block
        }
      }
    }

    tempQuizQ = shuffle(tempQuizQ);
    tempQuizA = shuffle(tempQuizA);

    console.log("tempQuiz:", tempQuizQ, tempQuizA);

    setQuizQ(tempQuizQ);
    setQuizA(tempQuizA);
  };

  useEffect(() => {
    nextGame();
  }, []);
  // start quiz button which sends user to new page to start quiz
  // fetch data
  // use state settings, when user is first starting with the current state should be set to null
  //need to incorporate useEffect when calling new question and state changes
  //shuffle fetched data and create new array
  // new shuffled data array is mapped so i can create the quiz & answers part. need to incorporate id, pairwithid, and flagurl & incorporates the data.json
  // need to create two functions that runs the quesitons(data holds object with properties id, pairwithid, flagurl) and answers( data holds object with properties id, pairwithid, and flahurl)
  // need a function that when user selects answer it compares it with the pairwith id of the selected answer with the pairwithid of the current question . if match is correct score is incremented
  // we need to keep track of score, needs to be set to 0
  //current question has to be removed from state using "id"
  // user interface for quiz onclick and submit
  //incorporate drag and drop settings
  // all filter not working on home page

  return (
    <>
      <h2>{quizQ[0] && quizQ[0].title}</h2>
      <div className="row">
        <div className="left">
          {quizQ &&
            quizQ.map((q) => {
              return <div>{q.text}</div>;
            })}
        </div>
        <div className="right">
          <div>
            {quizA &&
              quizA.map((a) => {
                if (a.img) {
                  return (
                    <div>
                      <img src={a.img} />
                    </div>
                  );
                } else {
                  return <div>{a.text}</div>;
                }
              })}
          </div>
        </div>
        <div>
          <button onClick={btnHandler}>Next</button>
        </div>
      </div>
    </>
  );
};
export default QuizPage;
