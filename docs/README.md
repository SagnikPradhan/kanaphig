kanaphig

# kanaphig

## Table of contents

### Functions

- [config](README.md#config)

## Functions

### config

▸ **config**<S\>(`schema`: S): *object*

Configure your configuration

**`example`** 
```ts
 import { config } from "kanaphig"

 const configuration = config({
   port: { default: "8080", env: "PORT", validate: z.string() },
   discord: {
     token: { env: "DISCORD_TOKEN", validate: z.string() }
   }
 })
```

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `S` | Schema |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | S | Schema for configuration |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `get` | <P\>(`path`: P) => *PropertyType*<S, P\> |
| `set` | <P\>(`path`: P, `value`: *PropertyType*<S, P\>) => { set: <P extends Path<S, PropertyDefinition<ZodTypeAny\>\> & string\>(path: P, value: PropertyType<S, P\>) =\> ...; get: <P extends Path<...\> & string\>(path: P) =\> PropertyType<...\>; validate: () =\> ...; } |
| `validate` | () => { set: <P extends Path<S, PropertyDefinition<ZodTypeAny\>\> & string\>(path: P, value: PropertyType<S, P\>) =\> ...; get: <P extends Path<...\> & string\>(path: P) =\> PropertyType<...\>; validate: () =\> ...; } |

Returns configuration handler

Defined in: index.ts:22
