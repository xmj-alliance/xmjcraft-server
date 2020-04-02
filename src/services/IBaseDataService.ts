import CUDMessage from "../models/CUDMessage";
import { ViewOption } from "../database/view";

export interface IBaseDataService<T> {
  getSingle: (uniqueField: string, options?: ViewOption) => Promise<T | null>,
  getList: (condition: any, options?: ViewOption) => Promise<T[]>,
  addSingle: (newItem: any) => Promise<CUDMessage>,
  addList: (newItems: any[]) => Promise<CUDMessage>,
  updateSingle: (uniqueField: string, token: any) => Promise<CUDMessage>,
  updateList: (condition: any, token: any) => Promise<CUDMessage>,
  deleteSingle: (uniqueField: string) => Promise<CUDMessage>,
  deleteList: (condition: any) => Promise<CUDMessage>,
}