import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import homeImg from "../Images/largemap.jpeg";
import { blue } from "@mui/material/colors";

const QuizPage = () => {
  const [quizQ, setQuizQ] = useState([]); // quiz question set to empty array
  const [quizA, setQuizA] = useState([]); // quiz answer set to empty array
  const [startIndex, setStartIndex] = useState(0); // start index set to or start at index 0
  const [endIndex, setEndIndex] = useState(4); // end index set to or start at index 0
  const [quizType, setQuizType] = useState(0); // quiztype is set to 0 (the first index 0 which is the flag category)
  const [score, setScore] = useState(0); // score is set to or starts at  0
  const [message, setMessage] = useState(""); //
  const [image, setImage] = useState();
  const [gameOver, setGameOver] = useState(false);

  const nextGame = () => {
    // data that is coming from api which was in an array using first 4 index, quiztype is flag, capital. region , population current quiz
    // this function will handle the logic for moving to the next game round.
    setStartIndex(startIndex + 4 * quizType); // I want to update the startIndex state by adding 4 * quizType to its current value. And the it adjusts the starting index for fetching the next set of questions and answers.
    setEndIndex(endIndex + 4 * quizType); // And this  updates the endIndex state by adding 4 * quizType to its current value. It adjusts the ending index for fetching the next set of questions and answers.
    //console.log("start quizType", quizType);

    if (quizType === 4) {
      // last question end of game
      // conditional checking if quizType is equal to 4, indicating that it's the end of the game.
      //end game
      //console.log("end game");
      setMessage("Game Over"); // message state is set to game over to inform users that the game is over
      setQuizQ([]); // here I want to  empty the quizQ and quizA states by setting them to empty arrays, effectively clearing the questions and answers. we dont want to display any more questions so we clear
      setQuizA([]); // here I want to  empty the quizQ and quizA states by setting them to empty arrays, effectively clearing the questions and answers.
      setGameOver(true); // sets the gameOver state to true, indicating that the game is over. to show game over screen
    } else {
      getData(); // If it's not the end of the game, this function is called to fetch the data for the next set of questions and answers.
      setQuizType(quizType + 1); // here we want  increments the quizType state by 1, indicating that the game is progressing to the next quiz type.
    }
  };

  const btnHandler = () => {
    // defines the btnHandler function which serves as the click event handler for the button.
    //console.log("click");
    nextGame(); // function is called to progress to the next game round.

    //0 name - flags
    //1 capital - region -
    //2 capital - name
    //3 name - population
    //4 end screen
  };

  /**
   * The function shuffles an array by randomly swapping its elements.
   * @returns the shuffled array.
   */
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
    // this is a asynchronous function named getData to fetch the data required for the quiz questions and answers.
    const url = `https://restcountries.com/v3.1/all`; // the url variable holds the URL from which the data is fetched. It points to an API endpoint that provides information about countries.
    const response = await fetch(url); // makes an HTTP GET request to the specified URL using the fetch function. The await keyword is used to wait for the response to be resolved.
    const data = await response.json(); //  extracts the JSON data from the response by calling the json method on the response object. It returns a promise that resolves to the parsed JSON data.

    let tempQuizQ = []; // initialize empty array will hold the temporary quiz questions and answers.
    let tempQuizA = []; // initialize empty array will hold the temporary quiz questions and answers.

    for (let i = 0; i < endIndex; i++) {
      console.log(data[i]);
      // loop that iterates over the fetched data to create the temporary quiz questions and answers arrays. The loop is executed for indices ranging from startIndex to endIndex.
      if (i >= startIndex && i < endIndex) {
        // excuted from start of index to end of index
        //console.log("i am adding");
        switch (
          quizType // we will use the switch statement to determine what is the quiztype(flag,region, country, population), ? and create appropriate question and answer objects based off current iteration.
        ) {
          case 0: // object 0 with question and answer is created and is pushed
            tempQuizQ.push({
              id: i,
              pairsWith: i,
              title: `This country ${data[i].name.common} has what flag?`,
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
              title: `This capital ${data[i].capital} is located in 
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
              title: `This capital ${data[i].capital[0]} is in what country?`,
              text: data[i].capital[0],
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
              title: `What is the population of ${data[i].name.common}?`,
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

    // once pushed we call shuffle function

    tempQuizQ = shuffle(tempQuizQ); // insert into function function // logic
    tempQuizA = shuffle(tempQuizA);

    console.log("tempQuiz:", tempQuizQ, tempQuizA);

    setQuizQ(tempQuizQ); // update the DOM when you run set
    setQuizA(tempQuizA);
  };

  useEffect(() => {
    // hook
    nextGame(); // do this on load which is start of the game
  }, []);

  const onDragEnd = (e) => {
    // arrow function amd we are taking an e parameter which is the event obj when a draggable item is dropped.
    //console.log("ondragEnd", e)

    //console.log(e.draggableId, e.destination.droppableId);

    if (e.draggableId === e.destination.droppableId) {
      // if the draggable id is equal to the destination droppable id if theyre the same then the draggable itemwas dropped in the correct location.
      setScore(score + 1); //if the draggable item was dropped in the correct location then the score in state increments  by 1 using our setScore function.
      setMessage("You are Correct"); // message in state is set to you are correct
      nextGame(); // we will call the nextGame function to progress to the next game round.
    } else {
      // the else will come into play if the user gets the answer wrong and the item was dropped in the wrong location.
      //console.log("what is quiz A", quizQ, quizA);
      const correctAnswer = quizA[0].text; // assign the coorectAnswer to quiz[0].text which is the first answer
      //console.log(quizType);
      for (let i = 0; i < 4; i++) {
        // iterate from 0-3 to search for the correct answwer in the quizA array.
        if (quizQ[0].id === quizA[i].id) {
          // check if the id of the firsy question in quizQ matches the id of the curremt iteration
          if (quizType === 1) {
            // checks if quiztyoe is 1 which is the flag category
            setMessage(`Wrong Answer! The correct answer is `); // if the the quiztype is 1 set the message state to indicate a wrong answer without displaying the right answer text
            setImage(quizA[i].img); // if the quiztype is 1 (flag category) set the image state to the image connected with the right answer
          } else {
            // the else is excuted if block type is not 1 (other categories such as region, captial, population)
            setImage(undefined); // sets the image in state to undefined so we clear any previous image assiocated with the correct answer
            setMessage(`Wrong Answer! The correct answer is ${quizA[i].text}`); // if the quiztype is not 1 set the message in set to indicate wrong answer and includes the text of the correct answer. basically here is the correct answer.
          }
        }
      }

      nextGame(); // function is called to progress to the next game
    }
  };

  //styles for left side
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    color: "#A0615F", // Font color for the left side
    fontSize: "30px", // Font size for the left side

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
    border: isDraggingOver ? "solid 5px green" : "none",
    color: "black",
    backgroundImage: `url("${img}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    fontSize: "40px",
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

  //  we are going to play the game again my calling the playAgain function which will reset back to default values. it resets various  states to their initial vales and triggers the setup of the next game round. Allows useer to start fresh.
  const playAgain = (e) => {
    setStartIndex(0); // i will set the startIndex state to 0, resetting it to the initial value.
    setEndIndex(4); // i will set the endIndex state to 4, resetting it to the initial value.
    setQuizType(0); // i will  set the quizType state to 0, indicating the initial quiz type.
    setScore(0); // i will the score state to 0, resetting the score to its initial value.
    setGameOver(false); // i will set the gameOver state to false, indicating that the game is not over.
    setMessage(""); // i will the message state to an empty string, clearing any previous message.
    nextGame(); // i will the nextGame() function, which is responsible for setting up the next game round. It triggers the retrieval of new data, shuffles the questions and answers, and updates the necessary states for the next game.
  };

  //RENDERING
  // everything we want to see on page jsx format which is conditional rendering
  return (
    <>
      <body className="quizpg">
        {" "}
        {/* set the class name of the body element to "quizpg" for styling purposes.  */}
        <h2>Score: {score}</h2>
        <h3>
          {message}
          {image && <img src={image} />}

          {/* if image exists the do this conditional rendering  */}
        </h3>
        <h2 className="Question">{quizQ[0] && quizQ[0].title}</h2>
        {gameOver && (
          <div className="gameOverScreen">
            <img src={homeImg} />
            <br />
            <div className="gameOverButtons">
              <button className="btn" onClick={playAgain}>
                Play Again
              </button>
              <Link className="btn" to="/">
                Go back Home
              </Link>
            </div>
          </div>
        )}
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
      </body>
    </>
  );
};
export default QuizPage;
