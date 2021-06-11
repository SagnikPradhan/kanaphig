import { NotObject, RecursiveObject } from "../types/basic";

export const isObject = (value: unknown): value is RecursiveObject<unknown> =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const isNotObject = (value: unknown): value is NotObject =>
  !isObject(value);
