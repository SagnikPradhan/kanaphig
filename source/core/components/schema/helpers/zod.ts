import type { z } from "zod";
import { Kanaphig, SchemaDescription } from "../type";

export function kzod<
  Output,
  Def extends z.ZodTypeDef = z.ZodTypeDef,
  Input = Output
>(
  schema:
    | { env?: string; parser: z.ZodType<Output, Def, Input> }
    | z.ZodType<Output, Def, Input>
): SchemaDescription<Output> {
  const { z } = require("zod") as typeof import("zod");

  const parser = (value: unknown) =>
    (schema instanceof z.ZodType ? schema : schema.parser).parse(value);

  return {
    parser,
    env: schema instanceof z.ZodType ? undefined : schema.env,
    kanaphig: Kanaphig,
  };
}
