"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const zod_1 = require("zod");
const _1 = require(".");
ava_1.default.beforeEach(() => {
    process.env["PORT"] = "7070";
    process.env["DISCORD_TOKEN"] = "...";
});
ava_1.default("Valid-Configuration", (t) => {
    t.notThrows(_1.config({ port: { validate: zod_1.z.string(), default: "8080", env: "PORT" } })
        .validate, "Recognises valid configuration one level deep");
});
ava_1.default("Nested-Valid-Configuration", (t) => {
    t.notThrows(_1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
        discord: { token: { validate: zod_1.z.string(), env: "DISCORD_TOKEN" } },
    }).validate, "Recognises nested valid configuration");
});
ava_1.default("Gets-Valid-Configuration", (t) => {
    const configuration = _1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
    }).validate();
    t.is(configuration.get("port"), "7070", "Gets configuration property");
});
ava_1.default("Gets-Valid-Nested-Configuration", (t) => {
    const configuration = _1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
        discord: { token: { validate: zod_1.z.string(), env: "DISCORD_TOKEN" } },
    }).validate();
    t.is(configuration.get("discord.token"), "...", "Gets nested configuration property using dot notation");
});
ava_1.default("Sets-Valid-Configuration", (t) => {
    const configuration = _1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
    });
    t.is(configuration.set("port", "9000").validate().get("port"), "9000", "Sets configuration property");
});
ava_1.default("Sets-Valid-Nested-Configuration", (t) => {
    const configuration = _1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
        discord: { token: { validate: zod_1.z.string(), env: "DISCORD_TOKEN" } },
    });
    t.is(configuration
        .set("discord.token", "NEW_TOKEN")
        .validate()
        .get("discord.token"), "NEW_TOKEN", "Sets nested configuration property using dot notation");
});
ava_1.default("Throws-Invalid-Configuration", (t) => {
    t.throws(_1.config({ port: { validate: zod_1.z.number(), env: "PORT" } }).validate, undefined, "Throws invalid configuration");
});
ava_1.default("Throws-Invalid-Nested-Configuration", (t) => {
    t.throws(_1.config({
        port: { validate: zod_1.z.string(), default: "8080", env: "PORT" },
        discord: { token: { validate: zod_1.z.number(), env: "DISCORD_TOKEN" } },
    }).validate, undefined, "Throws invalid nested configuration");
});
