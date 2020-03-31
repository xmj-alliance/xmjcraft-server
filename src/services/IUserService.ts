import User from "../models/User";
import CUDMessage from "../models/CUDMessage";
import { ViewOption } from "../database/view";

export interface IUserService {
  getUser: (dbname: string, options?: ViewOption) => Promise<User | null>,
  getUsers: (condition: any, options?: ViewOption) => Promise<User[]>,
  addUser: (user: User) => Promise<CUDMessage>,
  updateUser: (dbname: string, token: any) => Promise<CUDMessage>,
  updateUsers: (condition: any, token: any) => Promise<CUDMessage>,
  deleteUser: (dbname: string) => Promise<CUDMessage>,
  deleteUsers: (condition: any) => Promise<CUDMessage>,
}