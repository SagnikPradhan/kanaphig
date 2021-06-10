export interface RecursiveObject<Value> {
  [key: string]: Value | RecursiveObject<Value>;
}

export type DeepPartial<Value> = {
  [K in keyof Value]?: Value extends Record<string, unknown>
    ? DeepPartial<Value>
    : Value;
};

export type NotObject =
  | string
  | number
  | boolean
  | undefined
  | null
  | NotObject[];

export const isObject = (value: unknown): value is RecursiveObject<unknown> =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

export const isNotObject = (value: unknown): value is NotObject =>
  !isObject(value);
