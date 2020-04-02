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
      user: async (obj, args) => {

        let dbname = args.dbname;
        let options = {} as any;

        if (args.options) {
          options = args.options;
        }

        let userInDB = await this.service.getSingle(dbname, options);
        if (userInDB) {
          return userInDB;
        }

        return {};
      },
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
        let newItem = args.input;
        let message = await this.service.addSingle(newItem);
        if (message.ok) {
          message.message = `Successfully added ${newItem.dbname}.`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `Failed to add ${newItem.dbname}.`;
        }
        return message;
      },
      addUsers: async (obj, args) => {
        let newItems: any[] = args.input;
        let message = await this.service.addList(newItems);
        if (message.ok) {
          message.message = `Successfully added ${newItems.length} users.`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `At least one of the specified users among ${newItems.length} was failed to add.`;
        }
        return message;
      },
      updateUser: async (obj, args) => {

        let dbname = args.dbname;
        let token = args.token;

        let message = await this.service.updateSingle(dbname, token);
        if (message.ok) {
          message.message = `Successfully updated ${dbname}`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `Failed to update ${dbname}`;
        }
        return message;

      },
      updateUsers: async (obj, args) => {

        let condition = args.condition;
        let token = args.token;

        if (Object.entries(condition).length === 0 && condition.constructor === Object) {
          // conditions is a {}
          return {
            ok: false,
            numAffected: 0,
            message: "You must provide a valid condition."
          }
        }

        let message = await this.service.updateList(condition, token);
        if (message.ok) {
          message.message = `Successfully updated ${message.numAffected} users.`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `At least one of the specified users was failed to update.`;
        }
        return message;

      },
      deleteUser: async (obj, args) => {

        let dbname = args.dbname;
        let message = await this.service.deleteSingle(dbname);
        if (message.ok) {
          message.message = `Successfully deleted ${dbname}.`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `Failed to delete ${dbname}.`;
        }
        return message;

      },
      deleteUsers: async (obj, args) => {

        let condition = args.condition;

        if (Object.entries(condition).length === 0 && condition.constructor === Object) {
          // conditions is a {}
          return {
            ok: false,
            numAffected: 0,
            message: "You must provide a valid condition."
          }
        }

        let message = await this.service.deleteList(condition);
        if (message.ok) {
          message.message = `Successfully deleted ${message.numAffected} users.`;
        } else {
          console.error(`UserGraph:`, message.message);
          message.message = `At least one of the specified users was failed to delete.`;
        }
        return message;

      },
    },
    JSONObject: GraphQLJSONObject,
  };

  schema = makeExecutableSchema({typeDefs: this.typeDefs, resolvers: this.resolvers});

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
