// prettier-ignore
const initialEquation = {"operator":"*","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["a_{1}","a_{6}",1,{"operator":"*","args":["-1","x_{4}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{6}","a_{7}"]},2]},{"operator":"*","args":[3,"a_{7}"]},"a_{6}",{"operator":"*","args":["-2","x_{4}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-1","a_{7}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{9}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-1","a_{6}"]}]},2]},{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{4}",{"operator":"*","args":["-1","a_{1}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{9}"]},{"operator":"*","args":["-1","x_{1}"]}]},2]}]}]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-3","x_{4}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}"]},{"operator":"*","args":["-1","a_{9}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-3","x_{4}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}","a_{9}"]}]},2]}]}]},{"operator":"*","args":["-1","a_{12}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}","a_{12}",{"operator":"*","args":["a_{12}","x_{9}","a_{4}"]},{"operator":"*","args":["-1","a_{3}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{5}","a_{13}",{"operator":"*","args":["-1","x_{9}","a_{4}"]}]},2]}]}]},{"operator":"*","args":["-1","x_{13}"]},"-1"]},{"operator":"+","args":["a_{1}","x_{5}",1,{"operator":"*","args":["-1","a_{5}"]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{5}",{"operator":"*","args":["-1","x_{6}"]}]},2]},{"operator":"*","args":[3,"x_{6}"]},"x_{5}",{"operator":"*","args":["-2","a_{5}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-1","x_{6}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{8}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-1","x_{5}"]}]},2]},{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{5}",{"operator":"*","args":["-1","a_{1}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{8}"]},{"operator":"*","args":["-1","a_{2}"]}]},2]}]}]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-3","a_{5}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}"]},{"operator":"*","args":["-1","x_{8}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-3","a_{5}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}","x_{8}"]}]},2]}]}]},{"operator":"*","args":["-1","x_{11}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}","x_{11}",{"operator":"*","args":["x_{11}","a_{10}","x_{3}"]},{"operator":"*","args":["-1","x_{2}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}","x_{12}",{"operator":"*","args":["-1","a_{10}","x_{3}"]}]},2]}]}]};

// type Expression = bigint | string | { operator: String, args: Expression[] };

// debugging
function toObject(arg) {
  return JSON.parse(
    JSON.stringify(
      arg,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}

function toTeX(expr) {
  if (typeof expr === "bigint" || typeof expr === "string") {
    return `${expr}`;
  } else if (expr.operator === "^") {
    return `${toTeX(expr.args[0])}^{${toTeX(expr.args[1])}}`;
  } else if (expr.operator === "*") {
    if (expr.args[0] === -1n) {
      return `-${expr.args.slice(1).map(toTeX).join("")}`;
    }
    return `${expr.args.map(toTeX).join("")}`;
  } else {
    return `(${expr.args.map(toTeX).join(expr.operator)})`;
  }
}

function prettify(expr) {
  const parentheses = [["\\{", "\\}"], ["\\langle ", "\\rangle "], "[]", "()"];
  const sizes = ["\\Bigg", "\\bigg", "\\Big", "\\big"];
  let depth = 0;
  const chars = [];
  for (const char of toTeX(expr).replaceAll(/\+-/g, "-")) {
    if (char === "(") {
      if (depth < 4) {
        chars.push(sizes[depth]);
      }
      chars.push(parentheses[depth % parentheses.length][0]);
      depth++;
    } else if (char === ")") {
      depth--;
      if (depth < 4) {
        chars.push(sizes[depth]);
      }
      chars.push(parentheses[depth % parentheses.length][1]);
    } else {
      chars.push(char);
    }
  }
  return `${chars.join("")}=0`;
}

function substitute(expr, symbol, value) {
  if (expr === symbol) {
    return value;
  }
  if (typeof expr === "bigint" || typeof expr === "string") {
    return expr;
  } else {
    const { operator, args } = expr;
    const newArgs = args.map((arg) => substitute(arg, symbol, value));
    if (newArgs.every((arg) => typeof arg === "bigint")) {
      if (operator === "^") {
        return newArgs[0] ** newArgs[1];
      }
      if (operator === "+") {
        return newArgs.reduce((a, b) => a + b, 0n);
      }
      return newArgs.reduce((a, b) => a * b, 1n);
    }
    if (operator === "^") {
      if (newArgs[0] === 1n) {
        return newArgs[0];
      } else if (newArgs[1] === 0n) {
        return 1n;
      } else if (newArgs[1] === 1n) {
        return newArgs[0];
      }
    }
    if (operator === "*") {
      const nums = newArgs.filter((arg) => typeof arg === "bigint");
      if (nums.length) {
        const prod = nums.reduce((a, b) => a * b, 1n);
        if (prod === 0n) {
          return 0n;
        }
        const nonnums = newArgs.filter((arg) => typeof arg !== "bigint");
        if (prod === 1n) {
          return nonnums.length > 1 ? { operator, args: nonnums } : nonnums[0];
        }
        return { operator, args: [prod, ...nonnums] };
      }
    }
    if (operator === "+") {
      const nums = newArgs.filter((arg) => typeof arg === "bigint");
      if (nums.length) {
        const sum = nums.reduce((a, b) => a + b, 0n);
        const nonnums = newArgs.filter((arg) => typeof arg !== "bigint");
        if (sum === 0n) {
          return nonnums.length > 1 ? { operator, args: nonnums } : nonnums[0];
        }
        return { operator, args: [...nonnums, sum] };
      }
    }
    return { operator, args: newArgs };
  }
}

function normalizeIntegers(expr) {
  if (typeof expr === "number") {
    return BigInt(expr);
  } else if (typeof expr === "string") {
    if (/^-?\d+$/.test(expr)) {
      return BigInt(expr);
    }
    return expr;
  } else {
    const { operator, args } = expr;
    return {
      operator,
      args: args.map(normalizeIntegers),
    };
  }
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

class Game {
  playerNumber;
  variables;
  turnNumber;
  equation;
  submitButton;

  constructor() {
    this.variables = [...Array(26)].map(
      (_, idx) => `${idx % 2 ? "x" : "a"}_{${(idx >> 1) + 1}}`
    );
    this.turnNumber = 0;
    this.equation = normalizeIntegers(initialEquation);
    this.updateEquation();

    const playerNameEl = document.querySelector("#player-name");
    playerNameEl.textContent = this.getPlayerName();

    this.submitButton = document.querySelector("#submit");
    const goalTextEl = document.querySelector("#goal-text");
    const opponentName = this.getOpponentName();
    if (opponentName) {
      this.playerNumber = 1;
      goalTextEl.textContent = "Goal: solve the equation";
      const opponentNameEl = document.querySelector("#opponent-name");
      opponentNameEl.textContent = opponentName;
      this.waitForOpponent();
    } else {
      this.playerNumber = 0;
      goalTextEl.textContent = "Goal: prevent a solution to";
      this.waitForJoin();
    }
  }

  updateEquation() {
    window.UpdateMath("equation", prettify(this.equation));
    return equation;
  }

  assignValue(symbol, value, player) {
    this.equation = substitute(this.equation, symbol, value);

    const assignText = `${symbol[0]}${symbol.slice(3, symbol.length - 2)}`;
    const chatText = document.querySelector("#player-messages");

    const id = `log${this.turnNumber}`;
    chatText.innerHTML =
      // `<div class="event"><span class="player-event">${player}</span> set <span id="${id}"><span id="${id}Output">$$${symbol}=${value}$$</span></span></div>` +
      `<div class="event"><span class="player-event">${player}</span> set <span id="${id}"><span id="${id}Output">${symbol}=${value}</span></span></div>` +
      chatText.innerHTML;

    // document.getElementById("eqn").innerHTML = equation;
    // MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

    // var math = MathJax.Hub.getAllJax(`${id}`);
    // console.log({math})
    // MathJax.Hub.Queue(["Text", math, `${symbol}=${value}`]);

    // MathJax.Hub.queue.Push(function () {
    //   window.jaxes[id] = MathJax.Hub.getAllJax(`${id}Output`)[0];
    //   window.boxes[id] = document.getElementById(id);
    // });
    // window.UpdateMath(id, `${symbol}=${value}`);

    // this.updateEquation();
  }

  setAvailable() {
    const variable = this.variables[this.turnNumber];
    window.UpdateMath("assignment", `${variable}=`);
    window.UpdateMath(
      "equation",
      prettify(this.equation).replaceAll(variable, `\\color{blue}{${variable}}`)
    );
    this.submitButton.disabled = false;
    this.submitButton.onclick = () => {
      const textEl = document.getElementById("assignment-text");
      const text = textEl.value;
      if (!/^\d+$/.test(text)) {
        alert(`Not an integer!: ${text}`);
      } else {
        this.assignValue(
          this.variables[this.turnNumber],
          BigInt(text),
          this.getPlayerName()
        );
        this.updateEquation();
        this.turnNumber++;

        if (this.turnNumber < this.variables.length) {
          this.waitForOpponent();
        } else {
          this.finishGame();
        }
      }
    };
  }

  async waitForJoin() {
    await delay(3000);
    const opponentName = "Eich";
    localStorage.setItem("opponentName", opponentName);
    const opponentNameEl = document.querySelector("#opponent-name");
    opponentNameEl.textContent = opponentName;
    const chatText = document.querySelector("#player-messages");
    chatText.innerHTML =
      `<div class="event"><span class="player-event">${this.getOpponentName()}</span> joined the game</div>` +
      chatText.innerHTML;
    this.setAvailable();
  }

  async waitForOpponent() {
    this.submitButton.disabled = true;
    const value = await fetch(
      "https://www.random.org/integers/?num=1&min=1&max=1000&col=1&base=10&format=plain&rnd=new"
    ).then((res) => res.json());
    this.assignValue(
      this.variables[this.turnNumber],
      BigInt(value),
      this.getOpponentName()
    );
    this.turnNumber++;
    if (this.turnNumber < this.variables.length) {
      this.setAvailable();
    } else {
      this.finishGame();
    }
  }

  getPlayerName() {
    return localStorage.getItem("userName") ?? "Mystery player";
  }

  getOpponentName() {
    return localStorage.getItem("opponentName") ?? "Mystery player";
  }

  finishGame() {
    console.log(this.equation);
    console.log(this);
    this.updateEquation();
    const wonGame = (this.equation === 0n) ^ (this.playerNumber === 0) ? 1 : 0;
    alert(`You ${wonGame ? "win" : "lose"}!`);
    this.saveScore(wonGame);
  }

  saveScore(win) {
    const userName = this.getPlayerName();
    const scoresText = localStorage.getItem("scores");
    const scores = scoresText ? JSON.parse(scoresText) : [];
    this.updateScores(win, scores);

    localStorage.setItem("scores", JSON.stringify(scores));
  }

  updateScores(win, scores) {
    const userName = this.getPlayerName();
    const entry = scores.find(({ name }) => name === userName);
    if (entry) {
      entry.wins += win;
      entry.games += 1;
    } else {
      scores.push({ name: userName, wins: win, games: 1 });
    }

    scores.sort();
  }
}

const game = new Game();
