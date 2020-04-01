
// export const testSuite = () => describe("", async() => {});

export const userSpec = () => describe("User Spec", () => {


  test("Cheer up test", () => {
    let u = ["1", "2"];

    expect(u.length).toBeGreaterThanOrEqual(2);
  });


});