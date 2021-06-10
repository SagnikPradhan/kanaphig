import { isSchemaDescription, Schema, Structure } from "./types/schema";
import { DeepPartial } from "./types/util";

export function extractEnvironmentVariables<UserSchema extends Schema>(
  schema: UserSchema
) {
  const env: DeepPartial<Structure<UserSchema>> = {};

  for (const key in schema) {
    const value = schema[key];

    // Make sure we don't have falsy values
    if (!value) continue;

    // If extended description
    // Extract env variable
    if (isSchemaDescription(value)) {
      if (typeof value === "function") continue;
      if (!value.env) continue;

      env[key] = process.env[value.env];
    }

    // If nested values
    // Recursively get the values
    else env[key] = extractEnvironmentVariables(value);
  }

  return env;
}
