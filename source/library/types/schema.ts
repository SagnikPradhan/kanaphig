import { RecursiveObject } from "./util";

type SchemaDescription<T = unknown> = {
  parser: (value: unknown) => T;
  default?: T;
  env?: string;
};

export type Schema = RecursiveObject<SchemaDescription>;

export type Structure<S extends Schema> = {
  [K in keyof S]: S[K] extends Schema
    ? Structure<S[K]>
    : S[K] extends SchemaDescription<infer T>
    ? T
    : never;
};
