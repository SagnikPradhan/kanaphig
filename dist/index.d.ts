import { z } from "zod";
import { Path, PathValue } from "./type";
/** Creates deeply optional object */
declare type DeepPartial<O> = {
    [K in keyof O]?: O[K] extends Record<string, unknown> ? DeepPartial<O[K]> : O[K];
};
/** Environmental variable declaration specific config */
export declare type EnvConfig<C> = {
    [K in keyof C]?: C[K] extends Record<string, unknown> ? EnvConfig<C[K]> : EnvDeclaration<C[K]>;
};
/** Environement variable declaration */
export declare type EnvDeclaration<Prop> = Prop extends string ? {
    $env: string;
} : {
    $env: string;
    $transformer: (value: string) => Prop;
};
/** Configuration manager */
export declare class Configuration<Shape extends z.ZodRawShape, Schema extends z.ZodObject<Shape>, Config extends z.infer<Schema>> {
    #private;
    /**
     * Creates a new configuration manager
     *
     * @param schema - Zod schema
     */
    constructor(schema: Schema);
    /**
     * Validates your current configuration
     *
     * @returns Configuration manager
     */
    validate(): this;
    /**
     * Get a cetain property from the configuration
     *
     * @param path - Path to property
     * @returns Value of the property
     */
    get<P extends Path<Config> & string>(path: P): PathValue<Config, P>;
    /**
     * Hook up environment variables to your configuration
     *
     * @param config - ENV Declaration configuration
     * @returns Configuration manager
     */
    env(config: EnvConfig<Config>): this;
    /**
     * Manually add new configuration
     *
     * @param config - Deeply partial configuration
     * @returns Configuration manager
     */
    set(config: DeepPartial<Config>): this;
}
export {};
