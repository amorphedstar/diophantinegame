import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

import "./lobby.css";

export function Lobby({ userName }) {
  const navigate = useNavigate();
  const [opponentList, setOpponentList] = React.useState([]);
  const [opponentName, setOpponentName] = React.useState("");

  React.useEffect(() => {
    // fetch game list from backend
    fetch("/api/games")
      .then((response) => response.json())
      .then((games) => setOpponentList(games));
  }, []);

  const onClick = (isHost) => () => {
    if (isHost) {
      navigate(`/play/${userName}`);
    } else {
      if (!opponentName) return;
      navigate(`/play/${opponentName}`);
    }
    // render MathJax :(
    location.reload();
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

          <Button className="button" variant="primary" onClick={onClick(true)}>
            Host new game
          </Button>
          <Form.Select
            className="form-select"
            value={opponentName}
            onChange={(e) => setOpponentName(e.currentTarget.value)}
          >
            <option key={"choose"}>Choose a game</option>
            {opponentList.map(({ name }) => (
              <option value={name} key={`option${name}`}>
                {name}
              </option>
            ))}
          </Form.Select>
          <Button
            className="button"
            disabled={!opponentName}
            variant="primary"
            onClick={onClick(false)}
          >
            Join game
          </Button>
        </div>
      </div>
    </main>
  );
}
