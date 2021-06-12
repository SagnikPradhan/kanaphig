import { kanaphig, k } from "kanaphig";
import { z } from "zod";

export const config = kanaphig({
  schema: {
    port: k({
      env: "PORT",
      parser: (v) => z.number().nonnegative().parse(Number(v)),
    }),

    platform: {
      version: k((v) => z.number().nonnegative().parse(Number(v))),

      client: {
        id: k({ env: "PLATFORM_CLIENT_ID", parser: z.string().parse }),
        token: k({ env: "PLATFORM_CLIENT_TOKEN", parser: z.string().parse }),
      },
    },
  },

  configurationFile: "./config/config.yml",
});
