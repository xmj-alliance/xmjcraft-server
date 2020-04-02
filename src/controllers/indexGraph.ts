import { ApolloServer, Config } from "apollo-server-koa";
import { mergeSchemas } from "graphql-tools";

import UserGraph from "./userGraph";

export default class IndexGraph {

  apolloConfig = {} as Config;

  schema = mergeSchemas({
    schemas: [
      new UserGraph().schema,
    ]
  });

  server: ApolloServer;

  /**
   *
   */
  constructor() {
    const env = process.env.NODE_ENV;
    const isDevMode = (env && env.toLowerCase() === "development") || false;

    this.apolloConfig = {
      schema: this.schema,
      // enable playground only during development
      introspection: isDevMode,
      playground: isDevMode,
    }

    this.server = new ApolloServer(this.apolloConfig);
    
  }

}
