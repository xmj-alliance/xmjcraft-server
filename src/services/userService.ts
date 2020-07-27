import { IUserService } from "./IUserService";
import User from "../models/user";
import users from "../database/schema/userSchema"
import BaseDataService from "./baseDataService";

export default class UserService extends BaseDataService<User> implements IUserService {

  col = users;
  uniqueField = "dbname";

}