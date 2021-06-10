import { kanaphig } from "kanaphig";

process.env["PLATFORM_CLIENT_ID"] = "Client ID";
process.env["PLATFORM_CLIENT_TOKEN"] = "Client Token";

console.log(
  kanaphig(
    {
      port: { env: "PORT", parser: Number },

      platform: {
        version: Number,

        client: {
          id: { env: "PLATFORM_CLIENT_ID", parser: String },
          token: { env: "PLATFORM_CLIENT_TOKEN", parser: String },
        },
      },
    },
    { configurationFile: "./example.yml" }
  )
);
