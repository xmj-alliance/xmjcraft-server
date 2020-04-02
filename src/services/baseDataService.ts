import { ViewOption, buildProjection, buildPagination, buildSort } from "../database/view";
import { Model } from "mongoose";
import { IBaseDataService } from "./IBaseDataService";

export default class BaseDataService<T> implements IBaseDataService<T> {

  col: Model<any>;
  uniqueField = "";

  getSingle = async (uniqueField: string, options: ViewOption = {}) => {
    let projections = buildProjection(options);
    return <T>await this.col.findOne({[this.uniqueField]: uniqueField}, projections);
  }

  getList = async (condition: any, options: ViewOption = {}) => {

    let projections = buildProjection(options);
    let paginations = buildPagination(options);
    let sort = buildSort(options);
    return <T[]>await this.col.find(condition, projections, paginations).sort(sort);
  
  };

  addSingle = async (newItem: T) => {
    try {
      await this.col.create(newItem);
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

  addList = async (newItems: T[]) => {
    try {
      await this.col.create(newItems);
    } catch (error) {
      
      return {
        ok: false,
        numAffected: 0,
        message: error.message,
      }

    }
    
    return {
      ok: true,
      numAffected: newItems.length,
      message: "",
    }

  };

  updateSingle = async (uniqueField: string, token: any) => {

    try {
      let updateResult = await this.col.updateOne({[this.uniqueField]: uniqueField}, token);

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

  updateList = async (condition: any, token: any) => {

    try {
      let updateResult = await this.col.updateMany(condition, token);

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
  
  deleteSingle = async (uniqueField: string) => {

    try {
      let deleteResult = await this.col.deleteOne({[this.uniqueField]: uniqueField});

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

  deleteList = async (condition: any) => {

    try {
      let deleteResult = await this.col.deleteMany(condition);

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