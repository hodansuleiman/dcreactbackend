import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const QuizPage = () => {
  const [quizQ, setQuizQ] = useState([]);
  const [quizA, setQuizA] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [quizType, setQuizType] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const nextGame = () => {
    setStartIndex(startIndex + 4 * quizType);
    setEndIndex(endIndex + 4 * quizType);

    console.log("start quizType", quizType);

    if (quizType == 4) {
      //end game
      console.log("end game");
      setMessage("Game Over");
      setQuizQ([]);
      setQuizA([]);
      setGameOver(true);
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
              title: `This country "${data[i].name.common}" has what flag?`,
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
              title: `This capital "${data[i].capital}" is located in 
              what region?`,
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
              title: `This capital "${data[i].capital}" is in what country?`,
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
              title: `What is the population of "${data[i].name.common}"?`,
              text: data[i].name.common,
            });

            tempQuizA.push({
              id: i,
              pairsWith: i,
              title: "placeholder",
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

  const onDragEnd = (e) => {
    //console.log("ondragEnd", e)

    console.log(e.draggableId, e.destination.droppableId);

    if (e.draggableId === e.destination.droppableId) {
      setScore(score + 1);
      setMessage("You are Correct");
      nextGame();
    } else {
      setMessage("wrong");
      nextGame();
    }
  };

  const grid = 8;

  //styles for left side
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    //background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  //styles on right side
  const getListStyle = (isDraggingOver, img) => ({
    //background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: "150px",
    height: "100px",
    border: isDraggingOver ? "solid 5px black" : "none",
    backgroundImage: `url("${img}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  });

  const imgStyle = {
    postion: "absolute",
    top: 0,
    left: 0,
  };

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

  const playAgain = (e) => {
    setStartIndex(0);
    setEndIndex(4);
    setQuizType(0);
    setScore(0);
    setGameOver(false);
    setMessage("");
    nextGame();
  };

  return (
    <>
      <h2>Score: {score}</h2>
      <h3>{message}</h3>
      <h2 className="Question">
        {quizQ[0] && quizQ[0].title}

        {gameOver && (
          <div>
            Play Again or go back to home?
            <br />
            <button onClick={playAgain}>Play Again</button>
            <Link to="/">Go back Home</Link>
          </div>
        )}
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          <div className="left">
            {/* {quizQ &&
              quizQ.map((q) => {
                return <div>{q.text}</div>;
              })} */}

            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {quizQ.map((q, index) => {
                    if (index === 0) {
                      return (
                        <Draggable
                          key={q.id}
                          draggableId={`${q.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {q.text}
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="right">
            <div>
              {/* {quizA &&
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
                })} */}

              {quizA.map((a) => {
                return (
                  <Droppable droppableId={`${a.id}`}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver, a.img)}
                        className={"box"}
                      >
                        {provided.placeholder}

                        {a.img === undefined && <div>{a.text}</div>}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};
export default QuizPage;
