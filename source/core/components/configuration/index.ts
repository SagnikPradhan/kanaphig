import { SchemaDescription } from "../schema/type";
import KanaphigError from "../../../utils/error";

export function transformConfiguration(
  flattenedSchema: Record<string, SchemaDescription>,
  flattenedConfiguration: Record<string, unknown>
) {
  const configuration = {} as Record<string, unknown>;

  for (const [schemaKey, schema] of Object.entries(flattenedSchema)) {
    if (schemaKey in flattenedConfiguration) {
      const value = flattenedConfiguration[schemaKey];
      const parser = typeof schema === "function" ? schema : schema.parser;

      try {
        configuration[schemaKey] = parser(value);
      } catch (error) {
        throw new KanaphigError(
          `Error transforming ${schemaKey} - ${error.message}`,
          { error }
        );
      }
    } else
      throw new KanaphigError(`Expected ${schemaKey} to be set`, {
        configuration: flattenedConfiguration,
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
