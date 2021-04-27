import { z } from "zod";
import defaultsDeep from "lodash.defaultsdeep";

import { Path, PathValue } from "./type";

/** Creates deeply optional object */
type DeepPartial<O> = {
  [K in keyof O]?: O[K] extends Record<string, unknown>
    ? DeepPartial<O[K]>
    : O[K];
};

/** Recursively string index with certain values object */
interface RecursiveObject<Value> {
  [index: string]: Value | RecursiveObject<Value>;
}

/** Environmental variable declaration specific config */
export type EnvConfig<C> = {
  [K in keyof C]?: C[K] extends Record<string, unknown>
    ? EnvConfig<C[K]>
    : EnvDeclaration<C[K]>;
};

/** Environement variable declaration */
export type EnvDeclaration<Prop> = Prop extends string
  ? { $env: string }
  : { $env: string; $transformer: (value: string) => Prop };

/** Main Configuration Class */
export class Configuration<
  Shape extends z.ZodRawShape,
  Schema extends z.ZodObject<Shape>,
  Config extends z.infer<Schema>
> {
  #dirty = false;

  #schema: Schema;

  #envConfig = {} as DeepPartial<Config>;
  #configs = [this.#envConfig] as (DeepPartial<Config> | Config)[];

  #parsedConfig = {} as Config;

  /**
   * Creates a new configuration manager
   *
   * @param schema - Zod schema
   */
  constructor(schema: Schema) {
    this.#schema = schema;
  }

  /**
   * Validates your current configuration
   *
   * @returns Configuration manager
   */
  validate() {
    this.#parsedConfig = this.#schema.parse(
      defaultsDeep({}, ...this.#configs.reverse())
    ) as Config;

    this.#dirty = false;

    return this;
  }

  /**
   * Get a cetain property from the configuration
   *
   * @param path - Path to property
   * @returns Value of the property
   */
  get<P extends Path<Config> & string>(path: P) {
    if (!this.#dirty)
      return path
        .split(".")
        .reduce(
          (acc, key) =>
            typeof acc === "object" && acc !== null
              ? acc[key as keyof typeof acc]
              : acc,
          this.#parsedConfig as RecursiveObject<unknown> | unknown
        ) as PathValue<Config, P>;
    else throw new Error("Not validated configuration");
  }

  /**
   * Hook up environment variables to your configuration
   *
   * @param config - ENV Declaration configuration
   * @returns Configuration Manager
   */
  env(config: EnvConfig<Config>) {
    const recursivelyCreateEnvConfig = (
      config: RecursiveObject<unknown>,
      target: RecursiveObject<unknown> = this.#envConfig
    ) => {
      const isObject = (object: unknown): object is RecursiveObject<unknown> =>
        typeof object === "object" && object !== null;

      for (const [key, value] of Object.entries(config)) {
        if (isObject(value)) {
          const env = value["$env"];
          const transformer = value["$transformer"];

          if (typeof env === "string") {
            const environmentVariable = process.env[env];

            target[key] =
              typeof transformer === "function"
                ? transformer(environmentVariable)
                : environmentVariable;
          } else {
            if (!isObject(target[key])) target[key] = {};
            recursivelyCreateEnvConfig(
              value,
              target[key] as RecursiveObject<unknown>
            );
          }
        }
      }
    };

    recursivelyCreateEnvConfig(config);
    this.#dirty = true;
    return this;
  }

  /**
   * Manually add new configuration
   *
   * @param config - Deeply partial configuration
   * @returns Configuration manager
   */
  set(config: DeepPartial<Config>) {
    this.#configs.push(config);
    this.#dirty = true;
    return this;
  }
}
