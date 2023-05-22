// type Expression = number | string | { operator: String, args: Expression[] };

function toTeX(expr) {
  if (typeof expr === 'number' || typeof expr === 'string') {
    return `${expr}`;
  } else {
    return expr.args.map(toTeX).join(expr.operator);
  }
}

function prettify(expr) {
  return expr;
}

