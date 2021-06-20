import { kanaphig, k } from "kanaphig";

export const config = kanaphig({
  schema: {
    port: k({
      env: "PORT",
      parser: Number,
    }),

    platform: {
      version: k(Number),

      client: {
        id: k({ env: "PLATFORM_CLIENT_ID", parser: String }),
        token: k({ env: "PLATFORM_CLIENT_TOKEN", parser: String }),
      },

      configKey: k({
        env: "PLATFORM_CONFIG_KEY",
        parser: String,
      }),
    },
  },

  configurationFile: "./config.yml",
});
