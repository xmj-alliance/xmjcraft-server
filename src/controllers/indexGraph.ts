import { ApolloServer } from "apollo-server-koa";
import { mergeSchemas } from "graphql-tools";

import UserGraph from "./userGraph";

export default class IndexGraph {

  schema = mergeSchemas({
    schemas: [
      new UserGraph().schema,
    ]
  });

  server = new ApolloServer({
    schema: this.schema
  });;

}
