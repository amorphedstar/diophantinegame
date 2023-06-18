import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

import "./lobby.css";

export function Lobby({ userName, opponentName, setOpponentName }) {
  const navigate = useNavigate();
  const [opponentList, setOpponentList] = React.useState([]);

  React.useEffect(() => {
    // fetch game list from backend
    fetch("/api/games")
      .then((response) => response.json())
      .then((games) => setOpponentList(games));
  }, []);

  const onClick = () => {
    localStorage.setItem("opponentName", opponentName);
    setOpponentName(opponentName);
    navigate("/play");
  };

  return (
    <main className="bg-secondary">
      <div className="players">
        <p>
          Player:
          <span className="player-name" id="player-name">
            {userName}
          </span>
        </p>
        <div id="player-messages"></div>
      </div>
      <div className="game">
        <div>
          <legend>Create or join a game</legend>

          <Button className="button" variant="primary" onClick={onClick}>
            Host new game
          </Button>
          <Form.Select
            className="form-select"
            value={opponentName}
            onChange={(e) => setType(e.currentTarget.value)}
          >
            <option>Choose a game</option>
            {opponentList.map(({ name }) => (
              <option value={name}>{name}</option>
            ))}
          </Form.Select>
          <Button
            className="button"
            disabled={!opponentName}
            variant="primary"
            onClick={onClick}
          >
            Join game
          </Button>
        </div>
      </div>
    </main>
  );
}
