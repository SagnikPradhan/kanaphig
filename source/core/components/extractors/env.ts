import { SchemaDescription } from "../schema/type";

export function extractEnv(flattenedSchema: Record<string, SchemaDescription>) {
  try {
    require("dotenv/config");
    console.log("Using dotenv/config to load .env if any");
  } catch {
    // User is not using dotenv
  } finally {
    return Object.fromEntries(
      Object.entries(flattenedSchema).map(([key, value]) => {
        if (typeof value === "function") return [key, undefined];
        else if (typeof value.env === "undefined") return [key, undefined];
        else return [key, tryParsing(process.env[value.env])];
      })
    );
  }
}

function tryParsing(value: string | undefined) {
  if (value === undefined) return value;
  else
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
}
