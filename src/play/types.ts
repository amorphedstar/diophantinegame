export type Operator = "+" | "*" | "^";

export type Expression =
  | bigint
  | string
  | { operator: Operator; args: Expression[] };
