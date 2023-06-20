import { Expression } from "./types";

function toTeX(expr: Expression): string {
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

export function prettify(expr: Expression): string {
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
  return `$$${chars.join("")}=0$$`;
}

function isBigint(x: Expression): x is bigint {
  return typeof x === "bigint";
}

function isBigintArray(arr: Expression[]): arr is bigint[] {
  return arr.every((x) => isBigint(x));
}

function getBigintSubarray(arr: Expression[]): bigint[] {
  return arr.filter((x) => isBigint(x)) as bigint[];
}

function substituteOne(
  expr: Expression,
  symbol: string,
  value: bigint
): Expression {
  if (expr === symbol) {
    return value;
  }
  if (typeof expr === "bigint" || typeof expr === "string") {
    return expr;
  } else {
    const { operator, args } = expr;
    const newArgs = args.map((arg) => substituteOne(arg, symbol, value));
    if (isBigintArray(newArgs)) {
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
      const nums = getBigintSubarray(newArgs);
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
      const nums = getBigintSubarray(newArgs);
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

export function substitute(
  expr: Expression,
  assignments: Map<string, bigint>
): Expression {
  if (typeof expr === "string" && assignments.has(expr)) {
    return assignments.get(expr);
  }
  if (typeof expr === "bigint" || typeof expr === "string") {
    return expr;
  }
  const { operator, args } = expr;
  const newArgs = args.map((arg) => substitute(arg, assignments));
  if (isBigintArray(newArgs)) {
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
    const nums = getBigintSubarray(newArgs);
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
    const nums = getBigintSubarray(newArgs);
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
