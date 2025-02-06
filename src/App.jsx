import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [isGuessCorrect, setIsGuessCorrect] = useState("Make a guess");

  const [options, setOptions] = useState([
    "#3F7EB5",
    "#D92C5A",
    "#F4A623",
    "#7CD38A",
    "#8E44AD",
    "#2C3E50",
  ]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const randomColour = Math.floor(Math.random() * options.length);
  const hexValue = options[randomColour];
  const guess = isGuessCorrect ? (
    <h2 className="won" data-test-id="gameStatus">
      {" "}
      You Win
    </h2>
  ) : (
    <h2 className="lost" data-test-id="gameStatus">
      Try Again
    </h2>
  );
  useEffect(
    function randomColor() {
      setTargetColor(hexValue);
    },
    [targetColor]
  );
  function runCheck(guess) {
    const newTargetColor = Math.floor(Math.random() * options.length);
    const targetColorValue = options[newTargetColor];
    if (guess === hexValue) {
      setMessage("You win");
      setScore(score + 1);
      setTargetColor(targetColorValue);
      setIsGuessCorrect(true);
      setGuessCount(guessCount + 1);
    } else if (guess !== hexValue) {
      setMessage("Try Again");
      setTargetColor(targetColorValue);
      setIsGuessCorrect(false);
      setGuessCount(guessCount + 1);
    }
  }
  function reset() {
    const newTargetColor = Math.floor(Math.random() * options.length);
    const targetColorValue = options[newTargetColor];
    setScore(0);
    setMessage("");
    setTargetColor(targetColorValue);
    setGuessCount(0);
  }

  return (
    <>
      <div className="container">
        <div className="headings">
          {" "}
          <h1 data-testid="gameInstructions">Guess the correct colour</h1>
          {guessCount === 0 ? <h2>Make a guess</h2> : guess}
        </div>

        <h3 data-test-id="score">
          Score: {score} / {guessCount}
        </h3>
        <button
          className="resetBtn"
          data-testid="newGameButton"
          onClick={reset}
        >
          New Game
        </button>
        <div
          style={{
            backgroundColor: targetColor,
          }}
          className="target-color"
          data-test-id="colorBox"
        >
          {targetColor}
        </div>

        <ul className="guesses" data-test-id="colorOptions">
          {options.map((option) => (
            <li>
              <button
                className="guessbuttons"
                onClick={() => runCheck(option)}
                style={{
                  backgroundColor: option,
                  height: "80px",
                  width: "100px",
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

