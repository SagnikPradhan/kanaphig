kanaphig

# kanaphig

> Simple and concise typed configuration.

**`example`** 
```ts
 import { config } from "kanaphig"

 const configuration = config({
   port: { default: "8080", env: "PORT", validate: z.string() },
   discord: {
     token: { env: "DISCORD_TOKEN", validate: z.string() }
   }
 })

 configuration.set("port", "8080")
 configuration.validate()

 configuration.get("discord.token")
```

## Table of contents

### Interfaces

- [Handler](interfaces/handler.md)

### Functions

- [config](README.md#config)

## Functions

### config

▸ **config**<S\>(`schema`: S): [*Handler*](interfaces/handler.md)<S\>

Configure your configuration

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `S` | Schema |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | S | Schema for configuration |

**Returns:** [*Handler*](interfaces/handler.md)<S\>

Returns configuration handler

Defined in: [index.ts:64](https://github.com/SagnikPradhan/kanaphig/blob/fcac9fc/source/index.ts#L64)
