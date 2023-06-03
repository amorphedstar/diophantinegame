const express = require("express");
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

const verbose = false;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get("/scores", (_req, res) => {
  if (verbose) {
    console.log("GET /api/scores");
  }
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  if (verbose) {
    console.log("POST /api/score", req.body);
  }
  updateScores(req.body);
  res.send(scores);
});

// GetGames
apiRouter.get("/games", (_req, res) => {
  if (verbose) {
    console.log("GET /api/games");
  }
  res.send(availableGames);
});

// AddGame
apiRouter.post("/game", (req, res) => {
  if (verbose) {
    console.log("POST /api/game", req.body);
  }
  addGame(req.body.game);
  res.send(availableGames);
});

// NOTE: The following endpoint is not used in the frontend yet
//       but will be used once there is functionality for
//       connecting different users in a live game.
// CloseGame
apiRouter.delete("/game", (req, res) => {
  if (verbose) {
    console.log("DELETE /api/game", req.body);
  }
  closeGame(req.body.game);
  res.send(availableGames);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new game result to keep track of.
// The scores are saved in memory and disappear whenever the service is restarted.
const scores = {};
function updateScores({ user, win }) {
  scores[user] ??= { wins: 0, games: 0 };
  scores[user].wins += win;
  scores[user].games += 1;
}

const availableGames = ["Ada", "Tim"];

function addGame(game) {
  if (!availableGames.includes(game)) {
    availableGames.push(game);
  }
}

function closeGame(game) {
  const index = availableGames.indexOf(game);
  if (index !== -1) {
    availableGames.splice(index, 1);
  }
}