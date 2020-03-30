import { makeExecutableSchema } from "apollo-server-koa";

import * as user from "../models/user.graphql";
import { IUserService } from "../services/IUserService";
// import MockUserService from "../services/mockUserService";
import UserService from "../services/userService";

export default class UserGraph {

  typeDefs = user;

  service: IUserService;

  resolvers = {
    Query: {
      users: () => this.service.getUsers({}),
    },
  };

  schema = makeExecutableSchema({typeDefs: this.typeDefs, resolvers: this.resolvers})

  /**
   *
   */
  constructor() {
    
    // provide service

    this.service = new UserService();

    // based on a variable to see use DB or not
    // const isDevMode = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === "development";
    // if (isDevMode) {
    //   this.service = new MockUserService();
    // } else {
    //   this.service = new UserService();
    // }

    
  }

}
