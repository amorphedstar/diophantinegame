import React from "react";
import "./about.css";

export function About() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box">
          <img
            width="400px"
            src="diophantine_game_jones.png"
            title="Imagine coming up with an equation using exactly 26 unknowns, and then naming those unknowns x1-x26..."
            alt="Equation from Jones's paper"
          />
        </div>
      </div>
      <div>
        <p>
          Diophantine games involve an integer equation in some number of
          variables. Two players take turns choosing values for the variables,
          with one player trying to make the equation true in the end, and the
          other trying to make it unsatisfiable. J. P. Jones, motivated by the
          theory of Diophantine equations, studied Diophantine games and {}
          <a
            className="text-dark"
            href="https://link.springer.com/article/10.1007/BF01769063"
          >
            constructed a game in which one player has a winning strategy which
            is not computable
          </a>
          . The equation specifying this game is shown above as an excerpt from
          his paper.
        </p>

        <p>
          This web app allows you to play such a Diophantine game against
          friends or strangers online!
        </p>
      </div>
    </main>
  );
}
