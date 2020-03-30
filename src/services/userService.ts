import { IUserService } from "./IUserService";
import User from "../models/User";

export default class UserService implements IUserService {
  getUser: (dbname: string) => import("../models/User").default;




  getUsers = (condition: any) => {
    return [
      {
        dbname: "user-embro",
        name: "Embro"
      },
      {
        dbname: "user-dorian",
        name: "Dorian"
      },
    ] as User[];
  };




  addUser: (user: import("../models/User").default) => import("../models/CUDMessage").default;
  updateUser: (condition: any, token: any) => import("../models/CUDMessage").default;
  deleteUser: (dbname: string) => import("../models/CUDMessage").default;
  
}