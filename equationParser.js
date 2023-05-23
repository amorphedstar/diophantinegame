const masterEquation =
"(((a_{1})+(a_{6})+1+(-1)*(x_{4}))^(2)*((((a_{6})+(a_{7}))^(2)+3*(a_{7})+(a_{6})+(-2)*(x_{4}))^(2)+((((x_{9})+(-1)*(a_{7}))^(2)+((x_{10})+(-1)*(a_{9}))^(2))*(((x_{9})+(-1)*(a_{6}))^(2)+((x_{10})+(-1)*(a_{8}))^(2)*(((x_{4})+(-1)*(a_{1}))^(2)+((x_{10})+(-1)*(a_{9})+(-1)*(x_{1}))^(2)))*(((x_{9})+(-3)*(x_{4}))^(2)+((x_{10})+(-1)*(a_{8})+(-1)*(a_{9}))^(2))*(((x_{9})+(-3)*(x_{4})+(-1))^(2)+((x_{10})+(-1)*(a_{8})*(a_{9}))^(2))+(-1)*(a_{12})+(-1))^(2)+(((x_{10})+(a_{12})+(a_{12})*(x_{9})*(a_{4})+(-1)*(a_{3}))^(2)+((x_{5})+(a_{13})+(-1)*(x_{9})*(a_{4}))^(2)))+(-1)*(x_{13})+(-1))*((a_{1})+(x_{5})+1+(-1)*(a_{5}))*((((x_{5})+(-1)*(x_{6}))^(2)+3*(x_{6})+(x_{5})+(-2)*(a_{5}))^(2)+((((a_{10})+(-1)*(x_{6}))^(2)+((a_{11})+(-1)*(x_{8}))^(2))*(((a_{10})+(-1)*(x_{5}))^(2)+((a_{11})+(-1)*(x_{7}))^(2)*(((a_{5})+(-1)*(a_{1}))^(2)+((a_{11})+(-1)*(x_{8})+(-1)*(a_{2}))^(2)))*(((a_{10})+(-3)*(a_{5}))^(2)+((a_{11})+(-1)*(x_{7})+(-1)*(x_{8}))^(2))*(((a_{10})+(-3)*(a_{5})+(-1))^(2)+((a_{11})+(-1)*(x_{7})*(x_{8}))^(2))+(-1)*(x_{11})+(-1))^(2)+(((a_{11})+(x_{11})+(x_{11})*(a_{10})*(x_{3})+(-1)*(x_{2}))^(2)+((a_{11})+(x_{12})+(-1)*(a_{10})*(x_{3}))^(2))))";

// write parser to take LaTeX with addition, subtraction, multiplication, and squaring, and convert to expression tree
function parse(expr) {
  let i = 0;
  function parseExpr() {
    let expr = parseTerm();
    let first = true;
    while (i < masterEquation.length && masterEquation[i] === "+") {
      i++;
      if (first) {
        expr = {
          operator: "+",
          args: [expr, parseTerm()],
        };
      } else {
        first = false;
        expr.args.push(parseTerm());
      }
    }
    return expr;
  }
  function parseTerm() {
    let expr = parseFactor();
    let first = true;
    while (i < masterEquation.length && masterEquation[i] === "*") {
      i++;
      if (first) {
        expr = {
          operator: "*",
          args: [expr, parseFactor()],
        };
      } else {
        first = false;
        expr.args.push(parseFactor());
      }
    }
    return expr;
  }
  function parseFactor() {
    let expr = parseBase();
    while (i < masterEquation.length && masterEquation[i] === "^") {
      i++;
      expr = {
        operator: "^",
        args: [expr, parseBase()],
      };
    }
    return expr;
  }
  function parseBase() {
    if (masterEquation[i] === "(") {
      i++;
      const expr = parseExpr();
      i++;
      return expr;
    } else {
      let j = i;
      while (
        j < masterEquation.length &&
        masterEquation[j] !== "+" &&
        masterEquation[j] !== "*" &&
        masterEquation[j] !== "^" &&
        masterEquation[j] !== ")"
      ) {
        j++;
      }
      const expr = masterEquation.slice(i, j);
      i = j;
      if (/^\d+$/.test(expr)) {
        return +expr;
      }
      return expr;
    }
  }
  return parseExpr();
}

// make a helper to merge identical operators
function merge(expr) {
  if (typeof expr === "number" || typeof expr === "string") {
    return expr;
  } else {
    const { operator, args } = expr;
    const newArgs = [];
    for (const arg of args) {
      const mergedArg = merge(arg);
      if (typeof mergedArg === "object" && mergedArg.operator === operator) {
        newArgs.push(...mergedArg.args);
      } else {
        newArgs.push(mergedArg);
      }
    }
    return {
      operator,
      args: newArgs,
    };
  }
}

console.log(merge(parse(masterEquation)));
console.log(toTeX(merge(parse(masterEquation))));

// dump parsed equation to eqn.json
const fs = require("fs");
fs.writeFileSync("eqn.json", JSON.stringify(merge(parse(masterEquation))));

// fs.writeFileSync("eqn.txt", toTeX(merge(parse(masterEquation))));
