[kanaphig](../README.md) / Configuration

# Class: Configuration<Shape, Schema, Config\>

Main Configuration Class

## Type parameters

| Name | Type |
| :------ | :------ |
| `Shape` | z.ZodRawShape |
| `Schema` | *z.ZodObject*<Shape\> |
| `Config` | *z.infer*<Schema\> |

## Table of contents

### Constructors

- [constructor](configuration.md#constructor)

### Properties

- [#configs](configuration.md##configs)
- [#dirty](configuration.md##dirty)
- [#envConfig](configuration.md##envconfig)
- [#parsedConfig](configuration.md##parsedconfig)
- [#schema](configuration.md##schema)

### Methods

- [env](configuration.md#env)
- [get](configuration.md#get)
- [set](configuration.md#set)
- [validate](configuration.md#validate)

## Constructors

### constructor

\+ **new Configuration**<Shape, Schema, Config\>(`schema`: Schema): [*Configuration*](configuration.md)<Shape, Schema, Config\>

Creates a new configuration manager

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `Shape` | ZodRawShape |
| `Schema` | *ZodObject*<Shape, ``"strip"``, ZodTypeAny, { [k in string \| number \| symbol]: addQuestionMarks<{ [k in string \| number \| symbol]: Shape[k]["\_output"]}\>[k]}, { [k in string \| number \| symbol]: addQuestionMarks<{ [k in string \| number \| symbol]: Shape[k]["\_input"]}\>[k]}, Schema\> |
| `Config` | { [k in string \| number \| symbol]: addQuestionMarks<{ [k in string \| number \| symbol]: Shape[k]["\_output"]}\>[k]} |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | Schema | Zod schema |

**Returns:** [*Configuration*](configuration.md)<Shape, Schema, Config\>

Defined in: [index.ts:43](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L43)

## Properties

### #configs

• `Private` **#configs**: (Config \| *DeepPartial*<Config\>)[]

Defined in: [index.ts:41](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L41)

___

### #dirty

• `Private` **#dirty**: *boolean*= false

Defined in: [index.ts:36](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L36)

___

### #envConfig

• `Private` **#envConfig**: *DeepPartial*<Config\>

Defined in: [index.ts:40](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L40)

___

### #parsedConfig

• `Private` **#parsedConfig**: Config

Defined in: [index.ts:43](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L43)

___

### #schema

• `Private` **#schema**: Schema

Defined in: [index.ts:38](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L38)

## Methods

### env

▸ **env**(`config`: [*EnvConfig*](../README.md#envconfig)<Config\>): [*Configuration*](configuration.md)<Shape, Schema, Config\>

Hook up environment variables to your configuration

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [*EnvConfig*](../README.md#envconfig)<Config\> | ENV Declaration configuration |

**Returns:** [*Configuration*](configuration.md)<Shape, Schema, Config\>

Configuration Manager

Defined in: [index.ts:95](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L95)

___

### get

▸ **get**<P\>(`path`: P): *PathValue*<Config, P\>

Get a cetain property from the configuration

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `P` | *string* & \`${string}.${string}\` & *string* |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | P | Path to property |

**Returns:** *PathValue*<Config, P\>

Value of the property

Defined in: [index.ts:75](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L75)

___

### set

▸ **set**(`config`: *DeepPartial*<Config\>): [*Configuration*](configuration.md)<Shape, Schema, Config\>

Manually add new configuration

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | *DeepPartial*<Config\> | Deeply partial configuration |

**Returns:** [*Configuration*](configuration.md)<Shape, Schema, Config\>

Configuration manager

Defined in: [index.ts:137](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L137)

___

### validate

▸ **validate**(): [*Configuration*](configuration.md)<Shape, Schema, Config\>

Validates your current configuration

**Returns:** [*Configuration*](configuration.md)<Shape, Schema, Config\>

Configuration manager

Defined in: [index.ts:59](https://github.com/SagnikPradhan/kanaphig/blob/e6cd496/source/index.ts#L59)
