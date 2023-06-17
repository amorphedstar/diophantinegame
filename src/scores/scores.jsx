import React from "react";

import "./scores.css";

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/scores")
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem("scores", JSON.stringify(scores));
      })
      .catch(() => {
        console.log('caught')
        const scoresText = localStorage.getItem("scores");
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-warning table-striped-columns">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id="scores">
          {scores?.length ? (
            scores.map((score, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{score.name.split("@")[0]}</td>
                <td>{`${score.wins}/${score.games}`}</td>
              </tr>
            ))
          ) : (
            <tr key="0">
              <td colSpan="3">Be the first to score</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
