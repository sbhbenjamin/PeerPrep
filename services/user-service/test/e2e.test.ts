import request from "supertest";

import { PrismaClient } from "@prisma/client";

import { createWebApplication } from "../entry-points/api/server";

import resetDb from "./helper/resetDb";

const prisma = new PrismaClient();

prisma.$connect();

const app = createWebApplication();

const mockApp = request(app);

beforeEach(async () => {
  await resetDb();
});

test("Testing adding of add users", () => {
  mockApp
    .post("/users")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);

  mockApp
    .get("/users")
    .expect([
      { name: "wei jun", email: "weijun@gmail.com", bio: null, url: null },
    ])
    .expect(200);
});

test("Testing adding of users", () => {
  mockApp
    .post("/users")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);
});

test("Testing no duplicate user", () => {
  mockApp
    .post("/users")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);

  mockApp
    .post("/users")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(202);
});

test("Testing edit of user", () => {
  mockApp.post("/users").send({ name: "wei jun", email: "weijun@gmail.com" });
  // .end();

  mockApp.get("/users?email=weijun@gmail.com").expect({
    name: "wei jun",
    email: "weijun@gmail.com",
    bio: "dad",
    url: "null",
  });

  //   mockApp
  //     .put(`/users/${user!.id}`)
  //     .send({ name: "New Name", email: "weijun@gmail.com" })
  //     .expect(200)
  //     .expect({
  //       name: "New Name",
  //       email: "weijun@gmail.com",
  //       bio: null,
  //       url: null,
  //     });
});
