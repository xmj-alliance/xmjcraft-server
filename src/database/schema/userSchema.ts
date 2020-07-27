import { model, Schema, Document } from "mongoose";
import User from "../../models/user";

interface UserDoc extends User, Document {}

const schema = new Schema({
  dbname: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: false
  },

});

export default model<UserDoc>("users", schema, "users");