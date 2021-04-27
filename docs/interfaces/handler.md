[kanaphig](../README.md) / Handler

# Interface: Handler<S\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | Schema |

## Table of contents

### Properties

- [get](handler.md#get)
- [set](handler.md#set)
- [validate](handler.md#validate)

## Properties

### get

• **get**: <P\>(`path`: P) => *PropertyType*<S, P\>

Get a configuration property

**`param`** Path of your configuration value

**`returns`** - Value

#### Type declaration:

▸ <P\>(`path`: P): *PropertyType*<S, P\>

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `P` | *string* & \`${string}.${string}\` & *string* & \`${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}.${string}.${string}\` & *string* |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `path` | P |

**Returns:** *PropertyType*<S, P\>

Defined in: [index.ts:46](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L46)

Defined in: [index.ts:46](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L46)

___

### set

• **set**: <P\>(`path`: P, `value`: *PropertyType*<S, P\>) => [*Handler*](handler.md)<S\>

Set a configuration property

**`param`** Path of your configuration value

**`param`** Value

**`returns`** Handler

#### Type declaration:

▸ <P\>(`path`: P, `value`: *PropertyType*<S, P\>): [*Handler*](handler.md)<S\>

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `P` | *string* & \`${string}.${string}\` & *string* & \`${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}.${string}\` & *string* & \`${string}.${string}.${string}.${string}.${string}.${string}\` & *string* |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `path` | P |
| `value` | *PropertyType*<S, P\> |

**Returns:** [*Handler*](handler.md)<S\>

Defined in: [index.ts:35](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L35)

Defined in: [index.ts:35](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L35)

___

### validate

• **validate**: () => [*Handler*](handler.md)<S\>

Validate the configuration

**`returns`** - Handler

#### Type declaration:

▸ (): [*Handler*](handler.md)<S\>

**Returns:** [*Handler*](handler.md)<S\>

Defined in: [index.ts:55](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L55)

Defined in: [index.ts:55](https://github.com/SagnikPradhan/kanaphig/blob/405e9aa/source/index.ts#L55)
