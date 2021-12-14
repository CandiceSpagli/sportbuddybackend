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
    console.log("resp---", resp);
    expect(typeof resp.body).toEqual("object");
    expect(resp.body.hasOwnProperty("saveUser")).toEqual(true);
    expect(resp.body.saveUser.hasOwnProperty("firstname")).toEqual(true);
    expect(resp.body.saveUser.firstname).toEqual("Christelle");
  });
  //   test("Should return false if email is not entered", async () => {
  //     await request(app)
  //       .post("/sign-up")
  //       .send({
  //         firstname: "Christelle",
  //         lastname: "Degiovanni",
  //         password: "azerty",
  //       })
  //       .expect(200)
  //       .expect({
  //         result: false,
  //         message: "Email must be sent",
  //       });
  //   });

  //   test("Should return false if password is not entered", async () => {
  //     await request(app)
  //       .post("/sign-up")
  //       .send({
  //         firstname: "Christelle",
  //         lastname: "Degiovanni",
  //         email: "Christelle@monaco.mc",
  //       })
  //       .expect(200)
  //       .expect({
  //         result: false,
  //         message: "Password must be sent",
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
