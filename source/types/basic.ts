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