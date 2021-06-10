import { RecursiveObject } from "./util";

interface ExtendedSchemaDescription<T> {
  parser: Parser<T>;
  env?: string;
}

type Parser<T> = (value: unknown) => T;

export type SchemaDescription<T = unknown> =
  | ExtendedSchemaDescription<T>
  | Parser<T>;

export type Schema = RecursiveObject<SchemaDescription>;

export function isSchemaDescription(
  value: Schema | SchemaDescription
): value is SchemaDescription {
  if (typeof value === "function") return true;
  if (typeof value === "object" && typeof value["parser"] === "function")
    return true;
  return false;
}

export type Structure<S extends Schema> = {
  [K in keyof S]: S[K] extends Schema
    ? Structure<S[K]>
    : S[K] extends SchemaDescription<infer T>
    ? T
    : never;
};
