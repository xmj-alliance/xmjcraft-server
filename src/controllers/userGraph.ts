import * as user from "../models/user.gql";

import { makeExecutableSchema } from "apollo-server-koa";

export default class BookGraph {

  typeDefs = user;

  users = [
    {
      dbname: "user-embro",
      name: "Embro"
    },
    {
      dbname: "user-dorian",
      name: "Dorian"
    },
  ]

  resolvers = {
    Query: {
      users: () => this.users,
    },
  };

  schema = makeExecutableSchema({typeDefs: this.typeDefs, resolvers: this.resolvers})

}
