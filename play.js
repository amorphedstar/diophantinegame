// prettier-ignore
const initialEquation = {"operator":"*","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["a_{1}","a_{6}",1,{"operator":"*","args":["-1","x_{4}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{6}","a_{7}"]},2]},{"operator":"*","args":[3,"a_{7}"]},"a_{6}",{"operator":"*","args":["-2","x_{4}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-1","a_{7}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{9}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-1","a_{6}"]}]},2]},{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{4}",{"operator":"*","args":["-1","a_{1}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{9}"]},{"operator":"*","args":["-1","x_{1}"]}]},2]}]}]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-3","x_{4}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}"]},{"operator":"*","args":["-1","a_{9}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{9}",{"operator":"*","args":["-3","x_{4}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}",{"operator":"*","args":["-1","a_{8}","a_{9}"]}]},2]}]}]},{"operator":"*","args":["-1","a_{12}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{10}","a_{12}",{"operator":"*","args":["a_{12}","x_{9}","a_{4}"]},{"operator":"*","args":["-1","a_{3}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["x_{5}","a_{13}",{"operator":"*","args":["-1","x_{9}","a_{4}"]}]},2]}]}]},{"operator":"*","args":["-1","x_{13}"]},"-1"]},{"operator":"+","args":["a_{1}","x_{5}",1,{"operator":"*","args":["-1","a_{5}"]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["x_{5}",{"operator":"*","args":["-1","x_{6}"]}]},2]},{"operator":"*","args":[3,"x_{6}"]},"x_{5}",{"operator":"*","args":["-2","a_{5}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":[{"operator":"*","args":[{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-1","x_{6}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{8}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-1","x_{5}"]}]},2]},{"operator":"*","args":[{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}"]}]},2]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{5}",{"operator":"*","args":["-1","a_{1}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{8}"]},{"operator":"*","args":["-1","a_{2}"]}]},2]}]}]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-3","a_{5}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}"]},{"operator":"*","args":["-1","x_{8}"]}]},2]}]},{"operator":"+","args":[{"operator":"^","args":[{"operator":"+","args":["a_{10}",{"operator":"*","args":["-3","a_{5}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}",{"operator":"*","args":["-1","x_{7}","x_{8}"]}]},2]}]}]},{"operator":"*","args":["-1","x_{11}"]},"-1"]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}","x_{11}",{"operator":"*","args":["x_{11}","a_{10}","x_{3}"]},{"operator":"*","args":["-1","x_{2}"]}]},2]},{"operator":"^","args":[{"operator":"+","args":["a_{11}","x_{12}",{"operator":"*","args":["-1","a_{10}","x_{3}"]}]},2]}]}]};

// type Expression = number | string | { operator: String, args: Expression[] };

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
  let depth = 0;
  const chars = [];
  for (const char of toTeX(expr).replaceAll(/\+-/g, "-")) {
    if (char === "(") {
      if (depth < 2) {
        chars.push("\\bigg");
      } else if (depth < 4) {
        chars.push("\\Big");
      }
      chars.push(parentheses[depth % parentheses.length][0]);
      depth++;
    } else if (char === ")") {
      depth--;
      if (depth < 2) {
        chars.push("\\bigg");
      } else if (depth < 4) {
        chars.push("\\Big");
      }
      chars.push(parentheses[depth % parentheses.length][1]);
    } else {
      chars.push(char);
    }
  }
  return `$$${chars.join("")}=0$$`;
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
      return eval(`(${newArgs.join(operator)})`);
    }
    return {
      operator,
      args: newArgs,
    };
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

function initializeEquation() {
  const equationEl = document.querySelector(".equation");
  const equation = normalizeIntegers(initialEquation);
  equationEl.textContent = prettify(equation);
  console.log(prettify(equation));
  return equation;
}

let equation = initializeEquation();
