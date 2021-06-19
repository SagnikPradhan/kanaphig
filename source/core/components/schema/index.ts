import {
  Schema,
  SchemaDescription,
  Parser,
  ExtendedSchemaDescription,
  Kanaphig,
} from "./type";

/**
 * Schema description
 *
 * @param description - Schema description. Can be a parser or extended configuration.
 * @returns - Kanaphig schema description
 */
export function k<T>(
  description: Parser<T> | ExtendedSchemaDescription<T>
): SchemaDescription<T> {
  (description as SchemaDescription<T>)["kanaphig"] = Kanaphig;
  return description as SchemaDescription<T>;
}

export function isSchemaDescription(
  value: Schema | SchemaDescription
): value is SchemaDescription {
  if (value["kanaphig"] === Kanaphig) return true;
  return false;
}
