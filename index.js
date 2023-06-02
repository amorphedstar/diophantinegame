const express = require("express");
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  updateScores(req.body);
  res.send(scores);
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
