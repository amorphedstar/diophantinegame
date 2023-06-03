const express = require("express");
const app = express();
const DB = require("./database.js");

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
apiRouter.get("/scores", async (_req, res) => {
  if (verbose) {
    console.log("GET /api/scores");
  }
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", async (req, res) => {
  if (verbose) {
    console.log("POST /api/score", req.body);
  }
  const score = await DB.addScore(req.body);
  res.send(score);
});

// GetGames
apiRouter.get("/games", async (_req, res) => {
  if (verbose) {
    console.log("GET /api/games");
  }
  const games = await DB.getGames();
  res.send(games);
});

// AddGame
apiRouter.post("/game", async (req, res) => {
  if (verbose) {
    console.log("POST /api/game", req.body);
  }
  const game = await DB.addGame(req.body);
  res.send(game);
});

// NOTE: The following endpoint is not used in the frontend yet
//       but will be used once there is functionality for
//       connecting different users in a live game.
// CloseGame
apiRouter.delete("/game", async (req, res) => {
  if (verbose) {
    console.log("DELETE /api/game", req.body);
  }
  const game = await DB.closeGame(req.body);
  res.send(game);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
