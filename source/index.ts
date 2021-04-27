import { z } from "zod";
import { Path, Schema, PropertyType, PropertyDefinition } from "./type";

/**
 * Configure your configuration
 *
 * @example
 * ```ts
 *  import { config } from "kanaphig"
 *
 *  const configuration = config({
 *    port: { default: "8080", env: "PORT", validate: z.string() },
 *    discord: {
 *      token: { env: "DISCORD_TOKEN", validate: z.string() }
 *    }
 *  })
 * ```
 *
 * @param schema - Schema for configuration
 * @returns Returns configuration handler
 */
export function config<S extends Schema>(schema: S) {
  const config = extractDefaultsAlongWithEnv(schema);

  const handler = {
    /**
     * Set a configuration property
     *
     * @param path - Path of your configuration value
     * @param value - Value
     * @returns Handler
     */
    set: <P extends Path<S, PropertyDefinition> & string>(
      path: P,
      value: PropertyType<S, P>
    ) => {
      const keys = path.split(".");
      const lastKey = keys.pop();

      const object = keys.reduce(
        (object: Record<string, any>, key) =>
          typeof object[key] !== "object" ? object : object[key],
        config
      );

      if (lastKey && object) object[lastKey] = value;
      return handler;
    },

    /**
     * Get a configuration property
     *
     * @param path - Path of your configuration value
     * @returns - Value
     */
    get: <P extends Path<S, PropertyDefinition> & string>(path: P) => {
      const keys = path.split(".");

      return keys.reduce(
        (result, key) =>
          typeof result === "object" && result !== null
            ? result[key as keyof typeof result]
            : result,
        config as unknown
      ) as PropertyType<S, P>;
    },

    /**
     * Validate the configuration
     *
     * @returns - Handler
     */
    validate: () => {
      const internalValidateFn = (
        schema: Schema,
        config: unknown,
        path = ""
      ) => {
        if (typeof config !== "object")
          throw new Error("Recieved primitive in internal validate function");

        for (const key in config) {
          const keyPath = path + key;
          const propSchema = schema[key];
          const value = config[key as keyof typeof config];

          if (propSchema === undefined)
            throw new Error(`Unknown property ${keyPath}`);
          else if (isPropertyDefinition(propSchema)) {
            const result = propSchema.validate.safeParse(value);
            if (result.success === false)
              throw new Error(`Invalid property ${keyPath}`);
          } else internalValidateFn(propSchema, value, keyPath + ".");
        }
      };

      internalValidateFn(schema, config);

      return handler;
    },
  };

  return handler;
}

/**
 * Checks if the value is a schema or a property definition
 *
 * @param value - Value
 * @returns Boolean
 */
const isPropertyDefinition = (
  value: Schema | PropertyDefinition
): value is PropertyDefinition => value["validate"] instanceof z.ZodType;

/**
 * Extracts defaults from the schema and overrides with environment variables
 *
 * @param schema - Schema
 * @returns Record of defaults
 */
const extractDefaultsAlongWithEnv = (
  schema: Schema
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(schema).map(([key, value]) => {
      if (typeof value === "object")
        if (isPropertyDefinition(value))
          return [key, process.env[value["env"] || ""] || value["default"]];
        else return [key, extractDefaultsAlongWithEnv(value)];
      else throw new Error("Extract defaults recieved primitive");
    })
  );
};
