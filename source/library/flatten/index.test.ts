import test from "ava";
import { flatten } from ".";
import { isNotObject } from "../utils/type";

test("Flattens objects", (t) => {
  t.deepEqual(
    flatten({
      object: {
        house: { bedroom: { bathroom: 3 }, kitchen: 1, bathroom: 1 },
        outside: { pool: { bathroom: 1 } },
      },
      isEndNode: isNotObject,
    }),
    {
      "house.bathroom": 1,
      "house.kitchen": 1,
      "house.bedroom.bathroom": 3,
      "outside.pool.bathroom": 1,
    }
  );
});
