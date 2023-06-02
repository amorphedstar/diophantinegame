async function loadScores() {
  let scores = [];
  try {
    // Get the latest high scores from the service
    const response = await fetch("/api/scores");
    scores = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log("GOT SCORES!", scores);
  } catch {
    // If there was an error then just use the last saved scores
    const scoresText = localStorage.getItem("scores");
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  }

  displayScores(scores);
}

function displayScores(scores) {
  const tableBodyEl = document.querySelector("#scores");

  const sortedScores = Object.entries(scores)
    .map(([name, score]) => ({ name, ...score }))
    .sort((a, b) => b.wins - a.wins || a.games - b.games);

  if (sortedScores.length) {
    // Update the DOM with the scores
    for (const [i, score] of sortedScores.entries()) {
      const positionTdEl = document.createElement("td");
      const nameTdEl = document.createElement("td");
      const scoreTdEl = document.createElement("td");

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = score.name;
      scoreTdEl.textContent = `${score.wins}/${score.games}`;

      const rowEl = document.createElement("tr");
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = "<tr><td colSpan=3>Be the first to score</td></tr>";
  }
}

loadScores();
