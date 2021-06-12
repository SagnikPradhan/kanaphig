import { Schema, SchemaDescription } from "../types/core";
import KanaphigError from "./error";

export const Kanaphig = Symbol("Kanaphig");

export function isSchemaDescription(
  value: Schema | SchemaDescription
): value is SchemaDescription {
  if (value["kanaphig"] === Kanaphig) return true;
  return false;
}

export function transformConfiguration(
  flattenedSchema: Record<string, SchemaDescription>,
  flattenedConfiguration: Record<string, unknown>
) {
  const configuration = {} as Record<string, unknown>;

  for (const configurationKey in flattenedConfiguration) {
    if (configurationKey in flattenedSchema) {
      const value = flattenedConfiguration[configurationKey];
      const schema = flattenedSchema[configurationKey]!;
      const parser = typeof schema === "object" ? schema.parser : schema;
      configuration[configurationKey] = parser(value);

      continue;
    }

    throw new KanaphigError(`Unknown property ${configurationKey}`, {
      config: flattenedConfiguration,
    });
  }

  return configuration;
}

export function combineConfigurations(
  configurations: Record<string, unknown>[]
) {
  return configurations.reduce(
    (acc, curr) => ({ ...acc, ...removeUndefinedPairs(curr) }),
    {} as Record<string, unknown>
  );
}

function removeUndefinedPairs(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
}
