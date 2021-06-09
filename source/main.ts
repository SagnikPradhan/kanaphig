import { Schema, Structure } from "./library/types/schema";

/** Kanaphig options */
export interface KanaphigOptions<UserSchema extends Schema> {
  schema: UserSchema;
  configFile?: string;
}

/** Initialize configuration */
export default function kanaphig<UserSchema extends Schema>(
  options: KanaphigOptions<UserSchema>
): Structure<UserSchema> {}
