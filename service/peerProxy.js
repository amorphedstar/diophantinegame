const { WebSocketServer } = require("ws");
const uuid = require("uuid");

// Event messages
const GameEndEvent = "gameEnd";
const GameHostEvent = "gameHost";
const GameStartEvent = "gameStart";
const GameTerminateEvent = "gameTerminate";
const GameTurnEvent = "gameTurn";
const GameErrorEvent = "gameError";

const verbose = false;

// Keep track of all the connections so we can forward messages
let connections = [];
const games = new Map();

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on("message", async function message(data) {
      const msg = JSON.parse(data.toString());
      if (verbose) console.log({ msg });
      if (msg.type === GameEndEvent) {
        games.delete(connection.game);
        connection.game = undefined;
      } else if (msg.type === GameHostEvent) {
        const { from: name } = msg;
        connection.name = name;
        connection.game = name;
        games.set(name, { players: [connection] });
      } else if (msg.type === GameStartEvent) {
        const {
          from: name,
          value: { hostName },
        } = msg;
        connection.name = name;
        connection.game = hostName;
        try {
          if (games.get(hostName)?.players?.length !== 1) {
            throw new Error("Game could not be joined");
          }
          games.get(hostName).players[0].ws.send(data);
          games.get(hostName).players.push(connection);
        } catch (e) {
          if (verbose) console.log(e);
          connection.game = undefined;
          connection.ws.send(
            JSON.stringify({
              from: "server",
              type: GameErrorEvent,
              value: { message: "Game not found" },
            })
          );
        }
      } else if (msg.type === GameTurnEvent) {
        games.get(connection.game)?.players?.forEach((c) => {
          // if (c.id !== connection.id) {
          c.ws.send(data);
          // }
        });
      }
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on("close", () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          games.delete(connection.game);
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on("pong", () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    const deadIndices = [];

    connections.forEach((c, index) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        // || !games.has(c.game)) {
        deadIndices.push(index);
      }
    });

    deadIndices.reverse().forEach((i) => {
      games.get(connections[i].game)?.players?.forEach((c) => {
        c.ws.send(
          JSON.stringify({
            from: connections[i].name,
            type: GameTerminateEvent,
            value: { message: "Other player disconnected" },
          })
        );
      });
      games.delete(connections[i].game);
      connections[i].ws.terminate();
      connections.splice(i, 1);
    });

    connections.forEach((c) => {
      c.alive = false;
      c.ws.ping();
    });
  }, 10000);
}

function getGames() {
  if (verbose) console.log({ games });
  const gameList = [...games.values()]
    .filter(({ players }) => players.length == 1)
    .map(({ players: [{ id, name }] }) => ({
      id,
      name,
    }));
  if (verbose) console.log({ gameList });
  return gameList;
}

module.exports = { peerProxy, getGames };
