const request = require("supertest");
const app = require("../../app");

describe("Route sign-up", () => {
  test("should return true if firstname, lastname, email and password are corrects", async () => {
    var resp = await request(app).post("/sign-up").send({
      firstname: "Christelle",
      lastname: "Degiovanni",
      email: "Christelle@monaco.mc",
      password: "azerty",
    });
    expect(typeof resp.body).toEqual("object");
    expect(resp.body.hasOwnProperty("saveUser")).toEqual(true);
    expect(resp.body.saveUser.hasOwnProperty("firstname")).toEqual(true);
    expect(resp.body.saveUser.firstname).toEqual("Christelle");
    expect(resp.body.saveUser.lastname).toEqual("Degiovanni");
    expect(resp.body.saveUser.email).toEqual("Christelle@monaco.mc");
    expect(resp.body.token.length).toEqual(32);
  });

  //   test("Should return false if password is not entered", async () => {
  //     var resp = await request(app).post("/sign-up").send({
  //       firstname: "Christelle",
  //       lastname: "Degiovanni",
  //       email: "Christelle@monaco.mc",
  //     });
  //     console.log("resp---", resp);
  //     expect(typeof resp.body).toEqual("object");
  //     expect(resp.body.hasOwnProperty("saveUser")).toEqual(true);
  //     expect(resp.body.saveUser.firstname).toEqual("Christelle");
  //     expect(resp.body.saveUser.lastname).toEqual("Degiovanni");
  //     expect(resp.body.saveUser.email).toEqual("Christelle@monaco.mc");

  //   });

  //   test("Should return false if email is not entered", async () => {
  //     var resp = await request(app)
  //       .post("/sign-up")
  //       .send({
  //         firstname: "Christelle",
  //         lastname: "Degiovanni",
  //         password: "azerty",
  //       })
  //       .expect({
  //         result: false,
  //         message: "Email must be sent",
  //       });
  //   });

  //   test("Should return false if firstname is not entered", async () => {
  //     await request(app)
  //       .post("/sign-up")
  //       .send({
  //         lastname: "Degiovanni",
  //         email: "Christelle@monaco.mc",
  //         password: "azerty",
  //       })
  //       .expect(200)
  //       .expect({
  //         result: false,
  //         message: "Firstname  must be sent",
  //       });
  //   });

  //   test("Should return false if lastname is not entered", async () => {
  //     await request(app)
  //       .post("/sign-up")
  //       .send({
  //         firstname: "Christelle",
  //         email: "Christelle@monaco.mc",
  //         password: "azerty",
  //       })
  //       .expect(200)
  //       .expect({
  //         result: false,
  //         message: "Lastname  must be sent",
  //       });
  //   });
});

describe("Route sign-in", () => {
  test("Should return true if e-mail and passord OK", async () => {
    var resp = await request(app).post("/sign-in").send({
      email: "Christelle@monaco.mc",
      password: "azerty",
    });
    expect(resp.body.token.length).toEqual(32);
  });
});

describe("Route settings", () => {
  test("Should return true if firstname OK", async () => {
    var respSignin = await request(app).post("/sign-in").send({
      email: "Christelle@monaco.mc",
      password: "azerty",
    });
    var respSettings = await request(app).get("/settings").query({
      token: respSignin.body.token,
    });
    expect(respSettings.body.firstNameLoaded).toEqual("Christelle");
  });
});
afterAll(() => {
  return request(app).delete("/user-delete");
});
