const request = require("supertest");
const app = require("../../index");

// Mock axios, else you will really request the endpoint
// jest.mock("axios");
// import axios from "axios";

// beforeAll((done) => {
//   request(app)
//     .post("/api/auth/login")
//     .send({
//       username: user,
//       password: pw,
//     })
//     .end((err, response) => {
//       token = response.body.token; // save the token!
//       done();
//     });
// });

describe(" Post /api/auth/login", () => {
  // test("should respond with a 200 status code", async () => {
  //   const response = await request(app).post("/login").send({
  //     username: "username",
  //     password: "password",
  //   });
  //   expect(response.statusCode).toBe(200);
  // });
  describe("login function", () => {
    const email = "test@test.com";
    const password = "password";

    describe("with success", () => {
      const data = { something: {} };

      beforeEach(() => {
        /*
         * Not necessary for the moment, but will be useful
         * to test successful & error response
         */
        //axios.post.mockResolvedValue({});
      });

      it("should call endpoint with given email & password", () => {});
      test("It adds two numbers", () => {
        expect(1 + 1).toBe(2);
      });
    });
  });
});

// describe("GET / ", () => {
//   test("It should respond with an array of students", async () => {
//     const response = await request(app).get("/");
//     expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
//     expect(response.statusCode).toBe(200);
//   });
// });
