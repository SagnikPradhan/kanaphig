import { isObject } from "./basic";
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
