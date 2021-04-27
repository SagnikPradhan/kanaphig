"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const zod_1 = require("zod");
process.env["PORT"] = "9090";
process.env["DISCORD_TOKEN"] = "NOT ENV TOKEN";
const configuration = new _1.Configuration(zod_1.z.object({
    port: zod_1.z.number().default(8080),
    discord: zod_1.z.object({ token: zod_1.z.string() }),
}));
configuration.env({
    port: { $env: "PORT", $transformer: Number },
    discord: { token: { $env: "DISCORD_TOKEN" } },
});
configuration.set({
    discord: { token: "NOT FIRST SET TOKEN" },
});
configuration.set({
    discord: { token: "..." },
});
configuration.validate();
console.log(configuration.get("discord.token"), "...");
console.log(configuration.get("port"), 9090);
