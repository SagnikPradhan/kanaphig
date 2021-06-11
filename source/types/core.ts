import { Kanaphig } from "../utils/core";
import { RecursiveObject } from "./basic";
import { Path, PathValue } from "./path";

interface BaseSchemaDescription {
  kanaphig: typeof Kanaphig;
}

export interface ExtendedSchemaDescription<T> {
  parser: Parser<T>;
  env?: string;
}

export type Parser<T> = (value: unknown) => T;

export type SchemaDescription<T = unknown> =
  | (ExtendedSchemaDescription<T> & BaseSchemaDescription)
  | (Parser<T> & BaseSchemaDescription);

export type Schema = RecursiveObject<SchemaDescription>;

export type Structure<S extends Schema> = {
  [P in Path<S> as PathValue<S, P> extends SchemaDescription
    ? P
    : never]: PathValue<S, P> extends SchemaDescription<infer T> ? T : never;
};
