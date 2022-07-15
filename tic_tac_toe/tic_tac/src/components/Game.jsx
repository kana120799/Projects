import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const initialState = ["", "", "", "", "", "", "", "", ""];

function Game() {
  const [state, setState] = useState(initialState);
  let [decider, setDecider] = useState(0);
  const handleClick = (e) => {
    //destructuring of state.
    let copyState = [...state];

    if (!e.target.innerText) {
      copyState[e.target.id] = decider % 2 == 0 ? "X" : "O";
      setDecider(decider + 1);
      setState(copyState);
    }
  };
  //Handle Start Button
  const handleButtonClick = () => {
    setState(initialState);
    setDecider(0);
    setWinner(null);
  };

  useEffect(() => {
    checkForWinner(state);
  }, [state]);
  const [winner, setWinner] = useState(null);
  const checkForWinner = (state) => {
    const win = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [2, 5, 8],
      [1, 4, 7],
      [6, 7, 8],
      [3, 4, 5],
      [2, 4, 6],
    ];

    win.forEach((condition) => {
      let [a, b, c] = condition;

      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        console.log("checkkkkk", state[a] && state[a]);
        setWinner(state[a]);
      }
    });
  };

  return (
    <>
      <div className="container main ">
        <button className="button" onClick={handleButtonClick}>
          Start New Game
        </button>
        <div>
          {!winner && decider < 9 && (
            <div className="container  sub-main ">
              <div className="players flex-sub1">
                <div className={`play ${decider % 2 === 0 && "player-x"}`}>
                  Player-X
                </div>
                <div className={`play ${decider % 2 === 1 && "player-o"}`}>
                  Player-O
                </div>
              </div>
              <div className="game" onClick={handleClick}>
                <div id={0} className="square border-RB">
                  {state[0]}
                </div>
                <div id={1} className="square border-B">
                  {state[1]}
                </div>
                <div id={2} className="square border-LB">
                  {state[2]}
                </div>
                <div id={3} className="square border-RB">
                  {state[3]}
                </div>
                <div id={4} className="square border-B">
                  {state[4]}
                </div>
                <div id={5} className="square border-LB">
                  {state[5]}
                </div>
                <div id={6} className="square border-R">
                  {state[6]}
                </div>
                <div id={7} className="square ">
                  {state[7]}
                </div>
                <div id={8} className="square border-L">
                  {state[8]}
                </div>
              </div>
            </div>
          )}
          {(winner || decider === 9) && (
            <div className="announce">{`${winner} Win... 💐`}</div>
          )}
        </div>
      </div>
      <div className="copyright">Tic-tac-toe</div>
    </>
  );
}

export default Game;
