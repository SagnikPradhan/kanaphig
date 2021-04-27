/**
 * > Simple and concise typed configuration.
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
 *
 *  configuration.set("port", "8080")
 *  configuration.validate()
 *
 *  configuration.get("discord.token")
 * ```
 *
 * @module
 */
import { Path, Schema, PropertyType, PropertyDefinition } from "./type";
export interface Handler<S extends Schema> {
    /**
     * Set a configuration property
     *
     * @param path - Path of your configuration value
     * @param value - Value
     * @returns Handler
     */
    set: <P extends Path<S, PropertyDefinition> & string>(path: P, value: PropertyType<S, P>) => Handler<S>;
    /**
     * Get a configuration property
     *
     * @param path - Path of your configuration value
     * @returns - Value
     */
    get: <P extends Path<S, PropertyDefinition> & string>(path: P) => PropertyType<S, P>;
    /**
     * Validate the configuration
     *
     * @returns - Handler
     */
    validate: () => Handler<S>;
}
/**
 * Configure your configuration
 *
 * @param schema - Schema for configuration
 * @returns Returns configuration handler
 */
export declare function config<S extends Schema>(schema: S): Handler<S>;
