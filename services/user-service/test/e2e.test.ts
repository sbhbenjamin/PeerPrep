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

const createUserInput = { name: "wei jun", email: "weijun@gmail.com" };
const createUserInput1 = { name: "wei jun", email: "weijun1@gmail.com" };
const createUserInput2 = { name: "wei ming", email: "weiming@gmail.com" };
const createUserInput3 = { name: "xiao ming", email: "xiaoming@gmail.com" };

describe("POST /user", () => {
  test("POST /user", async () => {
    // act
    const res = await mockApp.post("/user").send(createUserInput);
    const user = await prisma.user.findUnique({
      where: { ...createUserInput },
    });

    // assert
    expect(res.status).toBe(200);
    expect(user).not.toBe(null);
  });

  test("POST /user [Duplicate]", async () => {
    // arrange
    await mockApp.post("/user").send(createUserInput);

    // act
    const res = await mockApp.post("/user").send(createUserInput);
    const users = await prisma.user.findMany({ where: { ...createUserInput } });

    // assert
    expect(res.status).toBe(409);
    expect(users.length).toBe(1);
  });
});

describe("GET /user", () => {
  test("GET /user", async () => {
    // arrange
    await prisma.user.create({ data: createUserInput });
    const user = await prisma.user.findMany();

    // action
    const res = await mockApp.get("/user");

    // assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
  });

  test("GET /user [Filtering]", async () => {
    const findEmail = "weijun@gmail.com";

    // arrange
    await prisma.user.createMany({
      data: [createUserInput, createUserInput1, createUserInput2],
    });
    const users = await prisma.user.findMany({
      where: { email: findEmail },
    });

    // action
    const res = await mockApp.get(`/user?email=${findEmail}`);

    // assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(users);
  });
});

describe("PUT /user", () => {
  test("PUT /user", async () => {
    // arrange
    await prisma.user.create({ data: createUserInput });
    const beforeModified = await prisma.user.findUnique({
      where: createUserInput,
    });

    // action
    const res = await mockApp
      .put(`/user/${beforeModified!.id}`)
      .send({ ...beforeModified, name: "new name" });
    const afterModified = await prisma.user.findUnique({
      where: {
        id: beforeModified!.id,
      },
    });

    // assert
    expect(res.status).toBe(200);
    expect(afterModified?.name).toBe("new name");
  });

  test("PUT /user [No such user]", async () => {
    // action
    const res = await mockApp
      .put(`/user/${0}`)
      .send({ id: 0, name: "new name" });

    // assert
    expect(res.status).toBe(404);
  });
});

describe("GET /user/id", () => {
  test("GET /user/id", async () => {
    // arrange
    const user = await prisma.user.create({ data: createUserInput });
    const { id } = user;

    // action
    const res = await mockApp.get(`/user/${id}`);

    // assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
  });

  test("GET /user/:id [No such user]", async () => {
    // action
    const res = await mockApp.get(`/user/${0}`);

    // assert
    expect(res.status).toBe(404);
  });
});

describe("DELETE /user/:id", () => {
  test("DELETE /user/:id", async () => {
    // arrange
    const user = await prisma.user.create({ data: createUserInput });
    const { id } = user;

    // action
    const res = await mockApp.delete(`/user/${id}`);
    const checkUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // assert
    expect(res.status).toBe(200);
    expect(checkUser).toBe(null);
  });

  test("DELETE /user/:id [User does not exist]", async () => {
    // action
    const res = await mockApp.delete(`/user/${0}`);

    // assert
    expect(res.status).toBe(404);
  });
});

// Test validation
