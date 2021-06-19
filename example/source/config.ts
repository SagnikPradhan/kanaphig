import { kanaphig, kzod } from "kanaphig";

import { z } from "zod";

export const config = kanaphig({
  schema: {
    port: kzod({
      env: "PORT",
      parser: z.number().nonnegative(),
    }),

    platform: {
      version: kzod(z.number().nonnegative()),

      client: {
        id: kzod({ env: "PLATFORM_CLIENT_ID", parser: z.string() }),
        token: kzod({ env: "PLATFORM_CLIENT_TOKEN", parser: z.string() }),
      },

      configKey: kzod({
        env: "PLATFORM_CONFIG_KEY",
        parser: z.object({ users: z.array(z.string()) }),
      }),
    },
  },

  configurationFile: "./config/config.yml",
});
