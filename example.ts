import { kanaphig, k } from "kanaphig";

process.env["PLATFORM_CLIENT_ID"] = "Client ID";
process.env["PLATFORM_CLIENT_TOKEN"] = "Client Token";

console.log(
  kanaphig({
    schema: {
      port: k({ env: "PORT", parser: Number }),

      platform: {
        version: k(Number),

        client: {
          id: k({ env: "PLATFORM_CLIENT_ID", parser: String }),
          token: k({ env: "PLATFORM_CLIENT_TOKEN", parser: String }),
        },
      },
    },

    configurationFile: "./example.yml",
  })("platform.client.id")
);
