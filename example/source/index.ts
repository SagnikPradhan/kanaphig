import { config } from "./config";

console.log({ all: config.all(), port: config.get("platform.version") });
