import { flatten } from "./library/flatten";
import { isSchemaDescription, Schema, Structure } from "./library/types/schema";

/** Kanaphig options */
export interface KanaphigOptions {
  configurationFile?: string;
}

export function kanaphig<UserSchema extends Schema>(
  schema: UserSchema,
  { configurationFile }: KanaphigOptions = {}
): Structure<UserSchema> {
  console.log({
    flattened: flatten({ object: schema, isEndNode: isSchemaDescription }),
    configurationFile,
  });

  return {} as Structure<UserSchema>;
}
