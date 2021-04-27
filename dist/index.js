"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const zod_1 = require("zod");
/**
 * Configure your configuration
 *
 * @param schema - Schema for configuration
 * @returns Returns configuration handler
 */
function config(schema) {
    const config = extractDefaultsAlongWithEnv(schema);
    const handler = {
        set: (path, value) => {
            const keys = path.split(".");
            const lastKey = keys.pop();
            const object = keys.reduce((object, key) => typeof object[key] !== "object" ? object : object[key], config);
            if (lastKey && object)
                object[lastKey] = value;
            return handler;
        },
        get: (path) => {
            const keys = path.split(".");
            return keys.reduce((result, key) => typeof result === "object" && result !== null
                ? result[key]
                : result, config);
        },
        validate: () => {
            const internalValidateFn = (schema, config, path = "") => {
                if (typeof config !== "object")
                    throw new Error("Recieved primitive in internal validate function");
                for (const key in config) {
                    const keyPath = path + key;
                    const propSchema = schema[key];
                    const value = config[key];
                    if (propSchema === undefined)
                        throw new Error(`Unknown property ${keyPath}`);
                    else if (isPropertyDefinition(propSchema)) {
                        const result = propSchema.validate.safeParse(value);
                        if (result.success === false)
                            throw new Error(`Invalid property ${keyPath}`);
                    }
                    else
                        internalValidateFn(propSchema, value, keyPath + ".");
                }
            };
            internalValidateFn(schema, config);
            return handler;
        },
    };
    return handler;
}
exports.config = config;
/**
 * Checks if the value is a schema or a property definition
 *
 * @param value - Value
 * @returns Boolean
 */
const isPropertyDefinition = (value) => value["validate"] instanceof zod_1.z.ZodType;
/**
 * Extracts defaults from the schema and overrides with environment variables
 *
 * @param schema - Schema
 * @returns Record of defaults
 */
const extractDefaultsAlongWithEnv = (schema) => {
    return Object.fromEntries(Object.entries(schema).map(([key, value]) => {
        if (typeof value === "object")
            if (isPropertyDefinition(value))
                return [key, process.env[value["env"] || ""] || value["default"]];
            else
                return [key, extractDefaultsAlongWithEnv(value)];
        else
            throw new Error("Extract defaults recieved primitive");
    }));
};
