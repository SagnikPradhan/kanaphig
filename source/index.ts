import {
  Schema,
  Structure,
  SchemaDescription,
  Parser,
  ExtendedSchemaDescription,
  NestedStructure,
  Configuration,
} from "./types/core";

import { flatten, unflatten } from "./utils/flatten";

import {
  combineConfigurations,
  isSchemaDescription,
  Kanaphig,
  transformConfiguration,
} from "./utils/core";

import { extractEnv } from "./extractors/env";
import { extractConfig } from "./extractors/user-config";
import { RecursiveObject } from "./types/basic";

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

/**
 * Generate configuration
 *
 * @param options - Kanaphig options
 * @param options.schema - Configuration schema
 * @param options.configurationFile - Configuration file path
 *
 * @returns Configuration
 */
export function kanaphig<UserSchema extends Schema>({
  schema: userSchema,
  configurationFile,
}: {
  schema: UserSchema;
  configurationFile?: string;
}): Configuration<UserSchema> {
  const schema = flatten<SchemaDescription>({
    object: userSchema,
    isEndNode: isSchemaDescription,
  });

  const configuration = transformConfiguration(
    schema,
    combineConfigurations([
      configurationFile ? extractConfig(configurationFile) : {},
      extractEnv(schema),
    ])
  ) as Structure<UserSchema> & Record<string, unknown>;

  const nestedConfiguration = unflatten(
    configuration
  ) as NestedStructure<UserSchema> & RecursiveObject<unknown>;

  return {
    get: <P extends keyof Structure<UserSchema>>(path: P) =>
      configuration[path] as Structure<UserSchema>[P],

    all: () => nestedConfiguration,
  };
}

export * from "./utils/core";
export * from "./types/core";
