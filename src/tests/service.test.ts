import Config from "../config";
import Database from "../database";

import { userSpec } from "./specs/user.spec";

let db: Database;

beforeAll(async () => {
  // init env
  new Config({mongo: {db: {data: "test"}}});
  // connect to DB
  db = new Database({isManualConnect: true});
  return await db.connect();
});

describe("Service Tests", () => {

  afterEach(async () => {
    if (db && db.instance) {
      return await db.instance.connection.dropDatabase();
    }
  });


  test("User Tests", () => {
    userSpec;
  });
  
  // test("Other Tests", () => {
  //   OtherSpec;
  // });

})

// afterAll(async () => {
//   if (db && db.instance) {
//     return await db.instance.connection.dropDatabase();
//   }
// });

