import { Configuration, NestedStructure, Structure } from "./type";

import { isSchemaDescription } from "./components/schema";
import { Schema, SchemaDescription } from "./components/schema/type";

import {
  combineConfigurations,
  transformConfiguration,
} from "./components/configuration";

import { extractConfig } from "./components/extractors/user-config";
import { extractEnv } from "./components/extractors/env";

import { flatten, unflatten } from "../utils/flatten";
import { RecursiveObject } from "../types/basic";

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
