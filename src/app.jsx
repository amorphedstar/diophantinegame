import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Lobby } from "./lobby/lobby";
import { Play } from "./play/play";
import { Scores } from "./scores/scores";
import { About } from "./about/about";
import { AuthState } from "./login/authState";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
  loader: { load: ["[tex]/color"] },
  tex: { packages: { "[+]": ["color"] } },
  CommonHTML: { linebreaks: { automatic: true } },
  "HTML-CSS": { linebreaks: { automatic: true } },
  SVG: { linebreaks: { automatic: true } },
  "fast-preview": {
    disabled: true,
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  messageStyle: "none",
};

function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") ?? ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <MathJaxContext
      version={2}
      config={mathJaxConfig}
      onStartup={(mathJax) => {
        mathJax.Hub.processSectionDelay = 0;
        window.addEventListener("resize", MJrerender);

        let t = -1;
        let delay = 1000;
        function MJrerender() {
          if (t >= 0) {
            // If we are still waiting, then the user is still resizing =>
            // postpone the action further!
            window.clearTimeout(t);
          }
          t = window.setTimeout(function () {
            MathJax.Hub.Queue(["Rerender", MathJax.Hub, "equation"]);
            t = -1; // Reset the handle
          }, delay);
        }
      }}
    >
      <BrowserRouter>
        <div className="body bg-dark text-light">
          <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
              <div className="navbar-brand">Diophantine Game</div>
              <menu className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="">
                    Login
                  </NavLink>
                </li>
                {authState === AuthState.Authenticated && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="lobby">
                        Lobby
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                    <NavLink className="nav-link" to="play">
                      Play
                    </NavLink>
                  </li> */}
                    <li className="nav-item">
                      <NavLink className="nav-link" to="scores">
                        Scores
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="about">
                    About
                  </NavLink>
                </li>
              </menu>
            </nav>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />
              }
              exact
            />
            <Route path="/lobby" element={<Lobby userName={userName} />} />
            <Route
              path="/play/:hostName"
              element={<Play userName={userName} />}
            />
            <Route path="/scores" element={<Scores />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <footer className="bg-dark text-light">
            <div className="container-fluid">
              <span className="text-reset">Thomas Draper</span>
              <a
                className="text-reset"
                href="https://github.com/amorphedstar/diophantinegame"
              >
                Source
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </MathJaxContext>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}

export default App;
