import test from "ava";
import { z } from "zod";

import { config } from ".";

test.beforeEach(() => {
  process.env["PORT"] = "7070";
  process.env["DISCORD_TOKEN"] = "...";
});

test("Valid-Configuration", (t) => {
  t.notThrows(
    config({ port: { validate: z.string(), default: "8080", env: "PORT" } })
      .validate,
    "Recognises valid configuration one level deep"
  );
});

test("Nested-Valid-Configuration", (t) => {
  t.notThrows(
    config({
      port: { validate: z.string(), default: "8080", env: "PORT" },
      discord: { token: { validate: z.string(), env: "DISCORD_TOKEN" } },
    }).validate,
    "Recognises nested valid configuration"
  );
});

test("Gets-Valid-Configuration", (t) => {
  const configuration = config({
    port: { validate: z.string(), default: "8080", env: "PORT" },
  }).validate();

  t.is(configuration.get("port"), "7070", "Gets configuration property");
});

test("Gets-Valid-Nested-Configuration", (t) => {
  const configuration = config({
    port: { validate: z.string(), default: "8080", env: "PORT" },
    discord: { token: { validate: z.string(), env: "DISCORD_TOKEN" } },
  }).validate();

  t.is(
    configuration.get("discord.token"),
    "...",
    "Gets nested configuration property using dot notation"
  );
});

test("Sets-Valid-Configuration", (t) => {
  const configuration = config({
    port: { validate: z.string(), default: "8080", env: "PORT" },
  });

  t.is(
    configuration.set("port", "9000").validate().get("port"),
    "9000",
    "Sets configuration property"
  );
});

test("Sets-Valid-Nested-Configuration", (t) => {
  const configuration = config({
    port: { validate: z.string(), default: "8080", env: "PORT" },
    discord: { token: { validate: z.string(), env: "DISCORD_TOKEN" } },
  });

  t.is(
    configuration
      .set("discord.token", "NEW_TOKEN")
      .validate()
      .get("discord.token"),
    "NEW_TOKEN",
    "Sets nested configuration property using dot notation"
  );
});

test("Throws-Invalid-Configuration", (t) => {
  t.throws(
    config({ port: { validate: z.number(), env: "PORT" } }).validate,
    undefined,
    "Throws invalid configuration"
  );
});

test("Throws-Invalid-Nested-Configuration", (t) => {
  t.throws(
    config({
      port: { validate: z.string(), default: "8080", env: "PORT" },
      discord: { token: { validate: z.number(), env: "DISCORD_TOKEN" } },
    }).validate,
    undefined,
    "Throws invalid nested configuration"
  );
});
