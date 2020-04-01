import Config from "../config";
import Database from "../database";

import { userSpec } from "./specs/user.spec";

let db: Database;

beforeAll(async () => {
  // init env
  new Config({mongo: {db: {data: "test"}}});
  // connect to DB
  db = new Database();
  await db.connect();
});

afterEach(async () => {
  if (db && db.instance) {
    await db.instance.connection.dropDatabase();
  }
});

describe("Service Tests", () => {
  userSpec();
})

