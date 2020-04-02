
import UserService from "../../services/userService";

export const userSpec = describe("User Inspection", () => {

  const service = new UserService();

  // The user spec also inspects baseDataService
  describe("User CRUD", () => {

    const users = [
      {
        dbname: "user-404notfound",
        name: "404notfound",
      },
      {
        dbname: "user-iloveAMZure",
        name: "iloveAMZure",
      },
      {
        dbname: "user-encore1Fois",
        name: "encore1Fois",
      },
    ];

    test("Add some users", async () => {

      let message = await service.addList(users);

      expect(message.numAffected).toEqual(users.length);
      
    });

    test("Get the user list", async () => {

      let usersInDB = await service.getList({});
      expect(usersInDB.length).toEqual(users.length);

    });

    test("Get a user detail", async () => {
      let dbname = users[0].dbname;
      let userInDB = await service.getSingle(dbname);
      expect(userInDB.name).toEqual(users[0].name);
    });

    test("Update a user", async () => {
      let newName = "Encore Une Fois";
      let userDBName = "user-encore1Fois";
      let message = await service.updateSingle(userDBName, {name: newName});

      expect(message.ok).toBeTruthy();
      expect(message.numAffected).toEqual(1);

      let userInDB = await service.getSingle(userDBName);
      expect(userInDB.name).toEqual(newName);

    });

    test("Update many users", async () => {
      let condition = {};
      let newName = "All your base is belong to us";

      let message = await service.updateList(condition, {name: newName});
      expect(message.ok).toBeTruthy();
      expect(message.numAffected).toEqual(users.length);

      let userInDB = await service.getList(condition);
      expect(userInDB[userInDB.length - 1].name).toEqual(newName);

    });

    test("Delete a user", async () => {
      let dbname = users[0].dbname;
      let message = await service.deleteSingle(dbname);


      expect(message.ok).toBeTruthy();
      expect(message.numAffected).toEqual(1);

      let userInDB = await service.getSingle(dbname);
      expect(userInDB).toBeFalsy(); // should return undefined or null

    });

    test("Delete many users", async () => {
      // already deleted 1 in the previous test
      let condition = {};
      let message = await service.deleteList(condition);

      expect(message.ok).toBeTruthy();
      expect(message.numAffected).toEqual(users.length - 1);

      let userInDB = await service.getList(condition);
      expect(userInDB.length).toBeLessThanOrEqual(0);

    });


    test("Add a user", async () => {

      let user = {
        dbname: "user-angularBiter",
        name: "Jian jiao jiao",
      };

      let message = await service.addSingle(user);

      expect(message.numAffected).toEqual(1);
      
    });

  });

});