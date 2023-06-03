const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const scoreCollection = db.collection("score");

// This will asynchronously test the connection and exit the process if it fails
async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
}
testConnection().catch((ex) => {
  console.log(
    `Unable to connect to database with ${url} because ${ex.message}`
  );
  process.exit(1);
});

async function addScore({ name, win }) {
  const currentScore = await scoreCollection.findOne({ name });
  if (currentScore) {
    const newScore = {
      wins: currentScore.wins + win,
      games: currentScore.games + 1,
    };
    return scoreCollection.updateOne({ name }, { $set: newScore });
  } else {
    return scoreCollection.insertOne({
      name,
      wins: win,
      games: 1,
    });
  }
}

function getHighScores() {
  const options = {
    sort: { wins: -1, games: 1 },
    limit: 10,
  };
  const cursor = scoreCollection.find({}, options);
  return cursor.toArray();
}

module.exports = { addScore, getHighScores };
