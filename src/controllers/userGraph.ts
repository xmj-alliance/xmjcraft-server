import { makeExecutableSchema, IResolvers } from "apollo-server-koa";
import { GraphQLJSONObject } from "graphql-type-json";

import * as userDefs from "../models/user.graphql";
import { IUserService } from "../services/IUserService";
import UserService from "../services/userService";

export default class UserGraph {

  typeDefs = userDefs;

  service: IUserService;

  resolvers: IResolvers = {
    Query: {
      users: async (obj, args) => {

        // Because we use GraphQLJSONObject scalar type
        // args.conditions and args.options are JSON not String

        let condition = {} as any;
        let options = {} as any;
        
        if (args.condition) {
          condition = args.condition;
        }

        if (args.options) {
          options = args.options;
        }

        return await this.service.getList(condition, options);
      },
    },
    Mutation: {
      addUser: async (obj, args) => {
        let message = await this.service.addSingle(args.input);
        if (message.ok) {
          message.message = `Add success`;
        } else {
          message.message = `Add failure`;
        }
        return message;
      },
    },
    JSONObject: GraphQLJSONObject,
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
