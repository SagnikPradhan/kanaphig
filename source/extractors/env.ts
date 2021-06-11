import { SchemaDescription } from "../types/core";

export function extractEnv(flattenedSchema: Record<string, SchemaDescription>) {
  return Object.fromEntries(
    Object.entries(flattenedSchema).map(([key, value]) => {
      if (typeof value === "function") return [key, undefined];
      else if (typeof value.env === "undefined") return [key, undefined];
      else return [key, process.env[value.env]];
    })
  );
}
