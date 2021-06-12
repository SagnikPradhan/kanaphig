import { Kanaphig } from "../utils/core";
import { RecursiveObject } from "./basic";
import { Path, PathValue } from "./path";

export interface ExtendedSchemaDescription<T> {
  parser: Parser<T>;
  env?: string;
}

export type Parser<T> = (value: unknown) => T;

export type SchemaDescription<T = unknown> = (
  | ExtendedSchemaDescription<T>
  | Parser<T>
) & {
  kanaphig: typeof Kanaphig;
};

export type Schema = RecursiveObject<SchemaDescription>;

export type Structure<S extends Schema> = {
  [P in Path<S> as PathValue<S, P> extends SchemaDescription
    ? P
    : never]: PathValue<S, P> extends SchemaDescription<infer T> ? T : never;
};

export type NestedStructure<S extends Schema> = {
  [K in keyof S]: S[K] extends SchemaDescription<infer T>
    ? T
    : S[K] extends Schema
    ? NestedStructure<S[K]>
    : never;
};

export interface Configuration<UserSchema extends Schema> {
  /**
   * Get a specific property from configuration
   *
   * @param path - Path to configuration
   * @returns Configuration value
   */
  get: <Path extends keyof Structure<UserSchema>>(
    path: Path
  ) => Structure<UserSchema>[Path];

  /**
   * Get the complete configuration as an object
   */
  all: () => NestedStructure<UserSchema>;
}
