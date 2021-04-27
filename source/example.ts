import { Configuration } from ".";
import { z } from "zod";

process.env["PORT"] = "9090";
process.env["DISCORD_TOKEN"] = "NOT ENV TOKEN";

const configuration = new Configuration(
  z.object({
    port: z.number().default(8080),
    discord: z.object({ token: z.string() }),
  })
);

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
