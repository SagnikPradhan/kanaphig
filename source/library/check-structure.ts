import KanaphigError from "./error";
import { Schema } from "./types/schema";
import { RecursiveObject } from "./types/util";

export function checkStructure<UserSchema extends Schema>(
  schema: UserSchema,
  data: RecursiveObject<unknown>,
  path?: string
) {
  const schemaProps = Object.keys(schema);
  const dataProps = Object.keys(data);

  if (dataProps.some((prop) => !schemaProps.includes(prop)))
    throw new KanaphigError(`Path ${path}.`, {});
}
