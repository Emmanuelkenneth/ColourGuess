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
  const randomColour = Math.floor(Math.random() * options.length);
  const hexValue = options[randomColour];
  const guess = isGuessCorrect ? (
    <h2 className="won" data-testid="gameStatus"> You Win</h2>
  ) : (
    <h2 className="lost" data-testid="gameStatus">Try Again</h2>
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
    } else if (guess !== hexValue) {
      setMessage("Try Again");
      setTargetColor(targetColorValue);
      setIsGuessCorrect(false);
    }
  }
  function reset() {
    const newTargetColor = Math.floor(Math.random() * options.length);
    const targetColorValue = options[newTargetColor];
    setScore(0);
    setMessage("");
    setTargetColor(targetColorValue);
  }

  return (
    <>
      <div className="container">
        <h1 data-testid="gameInstructions">Guess the correct colour</h1>
        {score === 0 ? <h2>Make a guess</h2> : guess}

        <h3 data-testid="score">Score: {score}</h3>
        <button className="resetBtn" data-testid="newGameButton" onClick={reset}>
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
            <li  data-test-id="colorOptions">
              <button
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
