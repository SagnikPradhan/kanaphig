import { z } from "zod";
declare type PathImpl<O, K extends keyof O, S> = K extends string ? O[K] extends Record<string, any> ? O[K] extends S ? never : `${K}.${PathImpl<O[K], Exclude<keyof O[K], keyof any[]> & string, S>}` | `${K}.${Exclude<keyof O[K], keyof any[]> & string}` : never : never;
declare type PathImpl2<T, S> = PathImpl<T, keyof T, S> | keyof T;
export declare type Path<T, S = {}> = PathImpl2<T, S> extends string | keyof T ? PathImpl2<T, S> : keyof T;
export declare type PathValue<T, P extends Path<T, S>, S = {}> = P extends `${infer Key}.${infer Rest}` ? Key extends keyof T ? Rest extends Path<T[Key], S> ? PathValue<T[Key], Rest, S> : never : never : P extends keyof T ? T[P] : never;
export declare type PropertyDefinition<T extends z.ZodTypeAny = z.ZodTypeAny> = {
    env?: string;
    default?: z.infer<T>;
    validate: T;
};
export interface Schema {
    [key: string]: PropertyDefinition | Schema;
}
export declare type PropertyType<S, P extends Path<S, PropertyDefinition>> = PathValue<S, P, PropertyDefinition> extends PropertyDefinition ? z.infer<PathValue<S, P, PropertyDefinition>["validate"]> : never;
export {};
