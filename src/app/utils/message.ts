import * as s from "superstruct";

export const message = <T>(
  struct: s.Struct<T, unknown>,
  message: string,
): typeof struct =>
  s.define("message", (value) => (s.is(value, struct) ? true : message));
