import { MathJax } from "better-react-mathjax";
import React from "react";

import { GameEvent } from "./constants";
import { GameNotifier } from "./gameNotifier";
import "./players.css";

export function Players({ userName, opponentName }) {
  const [events, setEvents] = React.useState([]);

  function handleGameEvent(event) {
    setEvents((events) => [...events, event]);
  }

  React.useEffect(() => {
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, []);

  function createMessageArray() {
    const messageArray = [];

    for (const [i, event] of events.entries()) {
      let message = "unknown";
      if (event.type === GameEvent.GameEndEvent) {
        message = `scored ${event.value.score}`;
      } else if (event.type === GameEvent.GameStartEvent) {
        message = `joined the game`;
      } else if (event.type === GameEvent.GameTurnEvent) {
        message = (
          <>
            set{" "}
            <MathJax inline>{`$${event.value.symbol}=${event.value.value}$`}</MathJax>
          </>
        );
      } else if (event.type === GameEvent.GameTerminateEvent) {
        message = `disconnected`;
      } else if (event.type === GameEvent.LocalEvent) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className="event">
          <span className={"player-event"}>{event.from.split("@")[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className="players">
      <p>
        Player:
        <span className="player-name" id="player-name">
          {userName}
        </span>
      </p>
      <p>
        Opponent:
        <span className="player-name" id="opponent-name">
          {opponentName}
        </span>
      </p>
      <div id="player-messages">{createMessageArray()}</div>
    </div>
  );
}
