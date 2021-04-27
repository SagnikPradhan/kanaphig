kanaphig

# kanaphig

## Table of contents

### Classes

- [Configuration](classes/configuration.md)

### Type aliases

- [EnvConfig](README.md#envconfig)
- [EnvDeclaration](README.md#envdeclaration)

## Type aliases

### EnvConfig

Ƭ **EnvConfig**<C\>: { [K in keyof C]?: C[K] extends Record<string, unknown\> ? EnvConfig<C[K]\> : EnvDeclaration<C[K]\>}

Environmental variable declaration specific config

#### Type parameters:

| Name |
| :------ |
| `C` |

Defined in: [index.ts:19](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L19)

___

### EnvDeclaration

Ƭ **EnvDeclaration**<Prop\>: Prop *extends* *string* ? { `$env`: *string*  } : { `$env`: *string* ; `$transformer`: (`value`: *string*) => Prop  }

Environement variable declaration

#### Type parameters:

| Name |
| :------ |
| `Prop` |

Defined in: [index.ts:26](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L26)
