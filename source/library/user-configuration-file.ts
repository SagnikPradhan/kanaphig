import yaml from "js-yaml";

import path from "path";
import fs from "fs";

import KanaphigError from "./error";
import { RecursiveObject } from "./types/util";

/**
 * Parses users configuration file
 *
 * @param configPath - Configuration file's path
 * @returns Configuration
 */
export function parseUserConfigurationFile(filePath: string) {
  const { ext } = path.parse(filePath);

  // Make sure the extension is right
  if (!isAllowedExtension(ext))
    throw new KanaphigError(
      "Only json, yml and yaml configuration files are allowed",
      { path: filePath }
    );

  // Resolve the file if path isn't already absolute
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  // Read file
  const configFile = fs.readFileSync(resolvedPath, "utf-8");

  // Parse the file using the right parser based on extension of file
  const parsedConfig: string | number | object | null | undefined =
    ext === ".json" ? JSON.parse(configFile) : yaml.load(configFile);

  // Make sure the parsed data is an object
  if (isObject(parsedConfig))
    throw new KanaphigError("Expected an object in configuration file", {
      path: resolvedPath,
    });

  return parsedConfig;
}

const isAllowedExtension = (ext: string) =>
  [".yml", ".yaml", ".json"].includes(ext);

const isObject = (data: unknown): data is RecursiveObject<unknown> =>
  typeof data !== "object" || Array.isArray(data) || data === null;