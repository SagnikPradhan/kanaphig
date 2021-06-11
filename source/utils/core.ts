import { Schema, SchemaDescription } from "../types/core";

export const Kanaphig = Symbol("Kanaphig");

export function isSchemaDescription(
  value: Schema | SchemaDescription
): value is SchemaDescription {
  if (value["kanaphig"] === Kanaphig) return true;
  return false;
}
