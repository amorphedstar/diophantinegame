const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const gameCollection = db.collection("game");
const scoreCollection = db.collection("score");
const userCollection = db.collection("user");

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

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

async function addGame({ name }) {
  return gameCollection.replaceOne({ name }, { name }, { upsert: true });
}

async function closeGame({ name }) {
  return gameCollection.deleteOne({ name });
}

async function getGames() {
  const options = {
    limit: 10,
  };
  const cursor = await gameCollection.find({}, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  addGame,
  closeGame,
  getGames,
};
