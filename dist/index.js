"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _dirty, _schema, _envConfig, _configs, _parsedConfig;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
/** Main Configuration Class */
class Configuration {
    /**
     * Creates a new configuration manager
     *
     * @param schema - Zod schema
     */
    constructor(schema) {
        _dirty.set(this, false);
        _schema.set(this, void 0);
        _envConfig.set(this, {});
        _configs.set(this, [__classPrivateFieldGet(this, _envConfig)]);
        _parsedConfig.set(this, {});
        __classPrivateFieldSet(this, _schema, schema);
    }
    /**
     * Validates your current configuration
     *
     * @returns Configuration manager
     */
    validate() {
        __classPrivateFieldSet(this, _parsedConfig, __classPrivateFieldGet(this, _schema).parse(lodash_defaultsdeep_1.default({}, ...__classPrivateFieldGet(this, _configs).reverse())));
        __classPrivateFieldSet(this, _dirty, false);
        return this;
    }
    /**
     * Get a cetain property from the configuration
     *
     * @param path - Path to property
     * @returns Value of the property
     */
    get(path) {
        if (!__classPrivateFieldGet(this, _dirty))
            return path
                .split(".")
                .reduce((acc, key) => typeof acc === "object" && acc !== null
                ? acc[key]
                : acc, __classPrivateFieldGet(this, _parsedConfig));
        else
            throw new Error("Not validated configuration");
    }
    /**
     * Hook up environment variables to your configuration
     *
     * @param config - ENV Declaration configuration
     * @returns Configuration Manager
     */
    env(config) {
        const recursivelyCreateEnvConfig = (config, target = __classPrivateFieldGet(this, _envConfig)) => {
            const isObject = (object) => typeof object === "object" && object !== null;
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
                    }
                    else {
                        if (!isObject(target[key]))
                            target[key] = {};
                        recursivelyCreateEnvConfig(value, target[key]);
                    }
                }
            }
        };
        recursivelyCreateEnvConfig(config);
        __classPrivateFieldSet(this, _dirty, true);
        return this;
    }
    /**
     * Manually add new configuration
     *
     * @param config - Deeply partial configuration
     * @returns Configuration manager
     */
    set(config) {
        __classPrivateFieldGet(this, _configs).push(config);
        __classPrivateFieldSet(this, _dirty, true);
        return this;
    }
}
exports.Configuration = Configuration;
_dirty = new WeakMap(), _schema = new WeakMap(), _envConfig = new WeakMap(), _configs = new WeakMap(), _parsedConfig = new WeakMap();
