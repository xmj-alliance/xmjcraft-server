import CUDMessage from "../models/CUDMessage";
import { ViewOption } from "../database/view";

export interface IBaseDataService {
  getSingle: (uniqueField: string, options?: ViewOption) => Promise<any | null>,
  getList: (condition: any, options?: ViewOption) => Promise<any[]>,
  addSingle: (user: any) => Promise<CUDMessage>,
  updateSingle: (uniqueField: string, token: any) => Promise<CUDMessage>,
  updateList: (condition: any, token: any) => Promise<CUDMessage>,
  deleteSingle: (uniqueField: string) => Promise<CUDMessage>,
  deleteList: (condition: any) => Promise<CUDMessage>,
}