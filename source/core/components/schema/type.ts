import { RecursiveObject } from "../../../types/basic";

export const Kanaphig = Symbol("Kanaphig");

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
