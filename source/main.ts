import { extractEnvironmentVariables } from "./library/environment-variables";
import { Schema, Structure } from "./library/types/schema";
import { parseUserConfigurationFile } from "./library/user-configuration-file";

/** Kanaphig options */
export interface KanaphigOptions {
  configurationFile?: string;
}

export function kanaphig<UserSchema extends Schema>(
  schema: UserSchema,
  { configurationFile }: KanaphigOptions = {}
): Structure<UserSchema> {
  const userConfiguration = configurationFile
    ? parseUserConfigurationFile(configurationFile)
    : {};

  const environmentConfiguration = extractEnvironmentVariables(schema);

  return {} as Structure<UserSchema>;
}
