// import supertest from "supertest";
// import { web } from "../src/app/web.js";
// import { prismaClient } from "../src/app/database.js";
// import { logger } from "../src/app/logging.js";
// import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
// import bcrypt from "bcrypt";
// import { func } from "joi";
// import exp from "constants";

// describe("POST /api/users", function () {
//   afterEach(async () => {
//     removeTestUser();
//   });

//   it("should can register new user", async () => {
//     const result = await supertest(web).post("/api/users").send({
//       username: "test",
//       password: "rahasia",
//       name: "test",
//     });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");
//     expect(result.body.data.password).toBeUndefined();
//   });

//   it("should reject if request is invalid", async () => {
//     const result = await supertest(web).post("/api/users").send({
//       username: "",
//       password: "",
//       name: "",
//     });

//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined();
//   });

//   it("should reject if username already registered", async () => {
//     let result = await supertest(web).post("/api/users").send({
//       username: "test",
//       password: "rahasia",
//       name: "test",
//     });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");
//     expect(result.body.data.password).toBeUndefined();

//     result = await supertest(web).post("/api/users").send({
//       username: "test",
//       password: "rahasia",
//       name: "test",
//     });

//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined();
//   });

//   describe("POST /api/users/login", function () {
//     beforeEach(async () => {
//       await createTestUser();
//     });

//     afterEach(async () => {
//       await removeTestUser();
//     });

//     it("should can login", async () => {
//       const result = await supertest(web).post("/api/users/login").send({
//         username: "test",
//         password: "rahasia",
//       });

//       expect(result.status).toBe(200);
//       expect(result.body.data.token).toBeDefined();
//       expect(result.body.data.token).not.toBe("test");
//     });

//     it("it should reject login if request is invalid", async () => {
//       const result = await supertest(web).post("/api/users/login").send({
//         username: "",
//         password: "",
//       });

//       expect(result.status).toBe(400);
//       expect(result.body.errors).toBeDefined();
//     });

//     it("it should reject login if password is invalid", async () => {
//       const result = await supertest(web).post("/api/users/login").send({
//         username: "test",
//         password: "salah",
//       });

//       expect(result.status).toBe(401);
//       expect(result.body.errors).toBeDefined();
//     });
//   });
// });

// describe("GET /api/users/current", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can get current user", async () => {
//     const result = await supertest(web)
//       .get("/api/users/current")
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");
//   });
// });

// describe("PUT /api/users/current", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can update current user", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         name: "test2",
//         password: "rahasia2",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test2");

//     const user = await getTestUser();
//     expect(await bcrypt.compare("rahasia2", user.password)).toBe(true);
//   });

//   it("should can update username", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         name: "test2",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test2");
//   });

//   it("should can update password", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "test")
//       .send({
//         password: "rahasia2",
//       });

//     expect(result.status).toBe(200);
//     expect(result.body.data.username).toBe("test");
//     expect(result.body.data.name).toBe("test");

//     const user = await getTestUser();
//     expect(await bcrypt.compare("rahasia2", user.password)).toBe(true);
//   });

//   it("should reject if request not valid", async () => {
//     const result = await supertest(web)
//       .patch("/api/users/current")
//       .set("Authorization", "salah")
//       .send({});

//     expect(result.status).toBe(401);
//   });
// });

// describe("DELETE /api/users/current", function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it("should can logout user", async () => {
//     const result = await supertest(web)
//       .delete("/api/users/logout")
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data).toBe("OK");

//     const user = await getTestUser();
//     expect(user.token).toBeNull();
//   });
// });
