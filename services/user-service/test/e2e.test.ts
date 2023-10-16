import { getPrismaClient } from "../data-access/prisma-client-factory";
import { createWebApplication } from "../entry-points/api/server";

import resetDb from "./helper/resetDb";

const request = require("supertest");

const app = createWebApplication();

const mockApp = request(app);

const prisma = getPrismaClient();

beforeEach(async () => {
  await resetDb();
});

test("POST /user", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" });
  expect(200);
});

test("GET /user", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);

  const user = await prisma.user.findMany();
  await mockApp.get("/user").expect(user).expect(200);
});

test("GET /user [Filtering]", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);

  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun1@gmail.com" })
    .expect(200);

  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun2@gmail.com" })
    .expect(200);

  const users = await prisma.user.findMany({
    where: { email: "weijun1@gmail.com" },
  });

  await mockApp.get("/user?email=weijun1@gmail.com").expect(users);
});

test("GET /user [Duplicate]", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(200);

  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" })
    .expect(409);
});

test("PUT /user", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" });

  const oldUser = await prisma.user.findUnique({
    where: { email: "weijun@gmail.com" },
  });

  await mockApp
    .put(`/user/${oldUser!.id}`)
    .send({ ...oldUser, name: "new name" });

  const newUser = await prisma.user.findUnique({
    where: { email: "weijun@gmail.com" },
  });

  expect(newUser?.name).toBe("new name");
});

test("GET /user/:id [No such user]", async () => {
  await mockApp.get(`/user/${7}`).expect(404);
});

test("POST /user/:id", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" });
  expect(200);

  const user = await prisma.user.findUnique({
    where: { email: "weijun@gmail.com" },
  });

  const { id } = user!;

  await mockApp.get(`/user/${id}`).expect(200);
});

test("DELETE /user/:id", async () => {
  await mockApp
    .post("/user")
    .send({ name: "wei jun", email: "weijun@gmail.com" });
  expect(200);

  const user = await prisma.user.findUnique({
    where: { email: "weijun@gmail.com" },
  });

  const { id } = user!;

  await mockApp.delete(`/user/${id}`).expect(200);

  const res = await prisma.user.findUnique({
    where: { email: "weijun@gmail.com" },
  });

  expect(res).toBe(null);
});

test("DELETE /user/:id [User does not exist]", async () => {
  const id = 0;

  await mockApp.delete(`/user/${id}`).expect(404);
});

// Test validation
