import clean from "rollup-plugin-clean";
import typescript from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

/** @type import("rollup").RollupOptions */
const config = {
  input: "./source/main.ts",

  plugins: [typescript()],

  output: {
    dir: "./dist",
    format: "commonjs",
    sourcemap: true,
  },
};

if (!process.env["ROLLUP_WATCH"]) config.plugins.push(clean(), terser());

export default config;
