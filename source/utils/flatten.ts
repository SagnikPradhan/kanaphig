import { isNotObject, isObject } from "./basic";
import { RecursiveObject } from "../types/basic";

export function flatten<Node>({
  object,
  isEndNode,
  _prefix = "",
}: {
  object: RecursiveObject<Node>;
  isEndNode: (data: RecursiveObject<Node> | Node) => data is Node;
  _prefix?: string;
}) {
  const result: Record<string, Node> = {};

  for (const [key, value] of Object.entries(object)) {
    if (isEndNode(value)) result[`${_prefix}${key}`] = value;
    else if (isObject(value))
      Object.assign(
        result,
        flatten({ object: value, isEndNode, _prefix: `${_prefix}${key}.` })
      );
    else continue;
  }

  return result;
}

export function unflatten<Node>(
  object: Record<string, Node>
): RecursiveObject<Node> {
  const result = {} as RecursiveObject<Node>;

  for (const [key, value] of Object.entries(object)) {
    const parts = key.split(".");

    const object = parts.reduce((object, part, idx) => {
      if (idx === parts.length - 1) return object;
      if (isNotObject(object[part])) object[part] = {};
      return object[part] as Record<string, unknown>;
    }, result as Record<string, unknown>);

    object[parts[parts.length - 1]!] = value;
  }

  return result;
}
