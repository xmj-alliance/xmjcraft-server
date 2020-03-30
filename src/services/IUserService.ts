import User from "../models/User";
import CUDMessage from "../models/CUDMessage";

export interface IUserService {
  getUser: (dbname: string) => User,
  getUsers: (condition: any) => User[],
  addUser: (user: User) => CUDMessage,
  updateUser: (condition: any, token: any) => CUDMessage,
  deleteUser: (dbname: string) => CUDMessage,
}