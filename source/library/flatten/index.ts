import { isObject, RecursiveObject } from "../utils/type";
import { Path, PathValue } from "./type";

/**
 * Flattened object
 * @param UserObject - Object to be flattened
 * @param EndNode - End node of the object
 */
export type Flattened<UserObject extends RecursiveObject<unknown>, EndNode> = {
  [P in Path<UserObject> as PathValue<UserObject, P> extends EndNode
    ? P
    : never]: PathValue<UserObject, P>;
};

/**
 * Flatten an object
 *
 * @param options - Options
 * @param options.object - Object to be flattened
 * @param options.isEndNode - Function to check if this is objects end node
 * @param options.prefix - Used by function internally
 *
 * @returns Flattened structure
 */
export function flatten<
  UserObject extends RecursiveObject<OtherNode | EndNode>,
  EndNode,
  OtherNode
>({
  object,
  isEndNode,
  prefix = "",
}: {
  object: UserObject;
  isEndNode: (
    data: OtherNode | EndNode | RecursiveObject<OtherNode | EndNode>
  ) => data is EndNode;
  prefix?: string;
}) {
  const result = {} as Record<string, EndNode>;

  for (const [key, value] of Object.entries(object)) {
    const path = `${prefix}${key}`;

    // If end node, add to flattened
    if (isEndNode(value)) {
      result[path] = value;
      continue;
    }

    // If object, check for inner properties
    if (isObject(value)) {
      Object.assign(
        result,
        flatten({ object: value, isEndNode, prefix: path + "." })
      );
    }
  }

  return result as Flattened<UserObject, EndNode>;
}
