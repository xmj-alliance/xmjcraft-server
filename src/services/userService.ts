import { IUserService } from "./IUserService";
import User from "../models/User";
import users from "../database/schema/userSchema"
import { ViewOption, buildProjection, buildPagination, buildSort } from "../database/view";

export default class UserService implements IUserService {

  private col = users;

  getUser = async (dbname: string, options: ViewOption = {}) => {
    let projections = buildProjection(options);
    return await this.col.findOne({dbname}, projections);
  }

  getUsers = async (condition: any, options: ViewOption = {}) => {

    let projections = buildProjection(options);
    let paginations = buildPagination(options);
    let sort = buildSort(options);
    return await this.col.find(condition, projections, paginations).sort(sort);
  
  };

  addUser = async (newUser: User) => {
    try {
      await this.col.create(newUser);
    } catch (error) {
      
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }

    }
    
    return {
      ok: true,
      numAffected: 1,
      message: "",
    }

  };

  updateUser = async (dbname: string, token: any) => {

    try {
      let updateResult = await this.col.updateOne({dbname}, token);

      return {
        ok: true,
        numAffected: updateResult.nModified,
        message: "",
      }

    } catch (error) {
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }
    }

  };

  updateUsers = async (condition: any, token: any) => {

    try {
      let updateResult = await this.col.update(condition, token, {multi: true});

      return {
        ok: true,
        numAffected: updateResult.nModified,
        message: "",
      }

    } catch (error) {
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }
    }

  };
  
  deleteUser = async (dbname: string) => {

    try {
      let deleteResult = await this.col.deleteOne({dbname});

      return {
        ok: true,
        numAffected: deleteResult.deletedCount || 0,
        message: "",
      }

    } catch (error) {
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }
    }

  };

  deleteUsers = async (condition: any) => {

    try {
      let deleteResult = await this.col.remove(condition);

      return {
        ok: true,
        numAffected: deleteResult.deletedCount || 0,
        message: "",
      }

    } catch (error) {
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }
    }

  };

}