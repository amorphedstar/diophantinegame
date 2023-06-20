export const variables: string[] = [...Array(26)].map(
  (_, idx) => `${idx % 2 ? "x" : "a"}_{${(idx >> 1) + 1}}`
);

export const GameEvent: Record<string, string> = {
  GameEndEvent: "gameEnd",
  GameHostEvent: "gameHost",
  GameStartEvent: "gameStart",
  GameTerminateEvent: "gameTerminate",
  GameTurnEvent: "gameTurn",
  GameErrorEvent: "gameError",
  LocalEvent: "local",
};
