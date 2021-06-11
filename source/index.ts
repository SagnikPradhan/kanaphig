import { flatten } from "./utils/flatten";
import {
  Schema,
  Structure,
  SchemaDescription,
  Parser,
  ExtendedSchemaDescription,
} from "./types/core";
import { isSchemaDescription, Kanaphig } from "./utils/core";
import { extractEnv } from "./extractors/env";
import { extractConfig } from "./extractors/user-config";
import KanaphigError from "./utils/error";

/** Kanaphig options */
export interface KanaphigOptions<UserSchema extends Schema> {
  schema: UserSchema;
  configurationFile?: string;
}

export function k<T>(
  description: Parser<T> | ExtendedSchemaDescription<T>
): SchemaDescription<T> {
  (description as SchemaDescription<T>)["kanaphig"] = Kanaphig;
  return description as SchemaDescription<T>;
}

export function kanaphig<UserSchema extends Schema>({
  schema: userSchema,
  configurationFile,
}: KanaphigOptions<UserSchema>) {
  const schema = flatten<SchemaDescription>({
    object: userSchema,
    isEndNode: isSchemaDescription,
  });

  const configuration = transformConfiguration(
    schema,

    combineConfigurations([
      extractEnv(schema),
      configurationFile ? extractConfig(configurationFile) : {},
    ])
  );

  return <P extends keyof Structure<UserSchema>>(path: P) =>
    configuration[path as string] as Structure<UserSchema>[P];
}

function transformConfiguration(
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

const combineConfigurations = (configurations: Record<string, unknown>[]) =>
  configurations.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {} as Record<string, unknown>
  );
