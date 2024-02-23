import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_SERVER_ENDPOINT,
  documents: ["./app/models/wp_queries.ts"],
  generates: {
    "./app/graphql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
