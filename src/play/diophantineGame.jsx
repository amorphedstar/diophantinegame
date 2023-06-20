import { MathJax } from "better-react-mathjax";
import React from "react";
import { Button } from "react-bootstrap";

import { GameEvent, variables } from "./constants";
import { delay } from "./delay";
import { prettify, substitute } from "./expression";
import { GameNotifier } from "./gameNotifier";
import { initialEquation } from "./initialEquation";
import "./game.css";

export function DiophantineGame({ userName, setOpponentName, hostName }) {
  const [turnNumber, setTurnNumber] = React.useState(0);
  const [equation, setEquation] = React.useState(initialEquation);
  const [equationString, setEquationString] = React.useState(
    prettify(initialEquation)
  );
  const [waiting, setWaiting] = React.useState(true);
  const [input, setInput] = React.useState("");
  const [playerNumber, setPlayerNumber] = React.useState(undefined);
  const [assignments, setAssignments] = React.useState(new Map());

  React.useEffect(() => {
    setEquationString(
      prettify(equation).replaceAll(
        variables[turnNumber],
        `\\color{${turnNumber % 2 == playerNumber ? "blue" : "red"}}{${
          variables[turnNumber]
        }}`
      )
    );
  }, [equation, turnNumber, playerNumber]);

  React.useEffect(() => {
    if (
      turnNumber < variables.length &&
      !equationString.includes(variables[turnNumber])
    ) {
      setTurnNumber(turnNumber + 1);
    }
  }, [equationString, turnNumber]);

  React.useEffect(() => {
    setEquation((equation) => substitute(equation, assignments));
  }, [assignments]);

  React.useEffect(() => {
    if (!waiting && turnNumber == variables.length) {
      setWaiting(true);
      const win = (equation === 0n) ^ (playerNumber === 0) ? 1 : 0;
      alert(`You ${win ? "win" : "lose"}!`);

      const newScore = { name: userName, win };

      // Let other players know the game has concluded
      GameNotifier.broadcastEvent(userName, GameEvent.GameEndEvent, { win });

      fetch("/api/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newScore),
      })
        .then((response) => response.json())
        .then((scores) =>
          localStorage.setItem("scores", JSON.stringify(scores))
        )
        .catch(() => {
          const scoresText = localStorage.getItem("scores");
          const scores = scoresText ? JSON.parse(scoresText) : [];

          const entry = scores.find(({ name }) => name === userName);
          if (entry) {
            entry.wins += win;
            entry.games += 1;
          } else {
            scores.push({ name: userName, wins: win, games: 1 });
          }

          scores.sort();

          localStorage.setItem("scores", JSON.stringify(scores));
        });
    }
  }, [waiting, setWaiting, turnNumber, equation, playerNumber, userName]);

  function handleGameEvent(msg) {
    if (msg.type === GameEvent.GameStartEvent) {
      setOpponentName(msg.from);
      setWaiting(false);
    } else if (msg.type === GameEvent.GameTurnEvent) {
      setAssignments((assignments) => {
        assignments.set(msg.value.symbol, BigInt(msg.value.value));
        return new Map(assignments);
      });
    } else if (msg.type === GameEvent.GameErrorEvent) {
      alert(`Error: ${msg.value.message}`);
    }
  }

  React.useEffect(() => {
    if (!hostName) return () => {};

    async function setup() {
      // wait to make sure this only happens after the reload :(
      await delay(500);
      GameNotifier.addHandler(handleGameEvent);
      if (hostName === userName) {
        GameNotifier.broadcastEvent(userName, GameEvent.GameHostEvent, {
          hostName,
        });
        setPlayerNumber(0);
      } else {
        GameNotifier.broadcastEvent(userName, GameEvent.GameStartEvent, {
          hostName,
        });
        setPlayerNumber(1);
        setWaiting(false);
        setOpponentName(hostName);
      }
    }
    setup();

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, [hostName, userName]);

  function onSubmit() {
    // if (turnNumber % 2 !== playerNumber || turnNumber >= variables.length) {
    //   return;
    // }
    if (!/^\d+$/.test(input)) {
      alert(`Not a nonnegative integer!: ${input}`);
      return;
    }
    GameNotifier.broadcastEvent(userName, GameEvent.GameTurnEvent, {
      symbol: variables[turnNumber],
      value: input,
    });
  }

  React.useEffect(() => {
    const listener = (event) => {
      if (
        event.code === "Enter" ||
        event.code === "NumpadEnter" ||
        event.key === "Enter" ||
        event.keyCode === 13
      ) {
        event.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="game center-content">
      <h2 id="goal-text">
        {playerNumber
          ? "Goal: solve the equation"
          : "Goal: prevent a solution to the equation"}
      </h2>
      <div className="equation" id="equation">
        <MathJax hideUntilTypeset={"every"} dynamic>
          <div id="equationOutput" className="output">
            {equationString}
          </div>
        </MathJax>
      </div>
      <br />
      <div className="center-content">
        <div className="assignment-container">
          <label className="equation" id="assignment">
            <MathJax hideUntilTypeset={"every"} inline dynamic>
              <div id="assignmentOutput" className="output">
                {`$$${variables[turnNumber] ?? ""}=$$`}
              </div>
            </MathJax>
          </label>
          <input
            disabled={waiting || turnNumber % 2 !== playerNumber}
            type="text"
            id="assignment-text"
            placeholder="Type an integer"
            onSubmit={onSubmit}
            value={input}
            onInput={(e) => setInput(e.target.value)}
          />
        </div>
        <Button
          disabled={waiting || turnNumber % 2 !== playerNumber}
          type="submit"
          className="btn btn-primary"
          id="submit"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
