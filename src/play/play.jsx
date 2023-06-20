import React from "react";
import { useParams } from "react-router-dom";

import { Players } from "./players";
import { DiophantineGame } from "./diophantineGame";

export function Play(props) {
  const { hostName } = useParams();
  const [opponentName, setOpponentName] = React.useState(undefined);
  return (
    <main className="bg-secondary">
      <Players {...props} opponentName={opponentName} />
      <DiophantineGame
        {...props}
        hostName={hostName}
        setOpponentName={setOpponentName}
      />
    </main>
  );
}
