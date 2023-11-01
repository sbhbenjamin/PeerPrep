import { loadEnvConfig } from "../commons/utils/env-config";
import { getPrismaClient } from "../data-access/prisma-client-factory";
import { createWebApplication } from "../entry-points/api/server";
import { generateJwtToken } from "./helper/generateMockJwt";

import resetDb from "./helper/resetDb";

const request = require("supertest");

const app = createWebApplication();

const mockApp = request(app);

const prisma = getPrismaClient();

loadEnvConfig();

beforeEach(async () => {
  await resetDb();
});

const invalidEmail = "che@ky";

const invalidUserInputOnlyName = { name: "wei jun" };
const invalidUserInputOnlyEmail = { email: "weijun@gmail.com" };
const createUserInputFull = {
  name: "james chua",
  email: "james@gmail.com",
  bio: "Chicken Nuggs",
  url: "https://chat.openai.com/",
};
const createUserInput = { name: "wei jun", email: "weijun@gmail.com" };
const createUserInput1 = { name: "wei jun", email: "weijun1@gmail.com" };
const createUserInput2 = { name: "wei ming", email: "weiming@gmail.com" };

describe("POST /user", () => {
  test("when valid name, email, bio and url are provided, return status 200 OK", async () => {
    // act
    const token = await generateJwtToken({ userId: "1" });
    console.log("token ", token);
    const res = await mockApp
      .post("/user")
      .set("Authorization", "bearer " + token)
      .send(createUserInputFull);
    const user = await prisma.user.findUnique({
      where: { ...createUserInputFull },
    });
    // assert
    console.log(res.status, "Status");
    expect(res.status).toBe(200);
    expect(user).not.toBe(null);
  });

  test("when valid name and email are provided, return status 200 OK", async () => {
    // act
    const res = await mockApp.post("/user").send(createUserInput);
    const user = await prisma.user.findUnique({
      where: { ...createUserInput },
    });
    // assert
    expect(res.status).toBe(200);
    expect(user).not.toBe(null);
  });

  test("when only email is provided, return status 400 Bad Request", async () => {
    // act
    const res = await mockApp.post("/user").send(invalidUserInputOnlyEmail);
    const user = await prisma.user.findUnique({
      where: { ...invalidUserInputOnlyEmail },
    });
    // assert
    expect(res.status).toBe(400);
    expect(user).toBe(null);
  });

  test("when only name is provided, return status 400 Bad Request", async () => {
    // act
    const res = await mockApp.post("/user").send(invalidUserInputOnlyName);
    const user = await prisma.user.findMany({
      where: { ...invalidUserInputOnlyName },
    });
    // assert
    expect(res.status).toBe(400);
    expect(user).toEqual([]);
  });

  test("when invalid email is provided, return status 400 Bad Request", async () => {
    // act
    const res = await mockApp.post("/user").send(invalidUserInputOnlyName);
    const user = await prisma.user.findMany({
      where: { ...createUserInput, email: invalidEmail },
    });
    // assert
    expect(res.status).toBe(400);
    expect(user).toEqual([]);
  });

  test("when invalid url is provided, return status 400 Bad Request", async () => {
    // act
    const res = await mockApp.post("/user").send(invalidUserInputOnlyName);
    const user = await prisma.user.findMany({
      where: { ...createUserInputFull, url: "help" },
    });
    // assert
    expect(res.status).toBe(400);
    expect(user).toEqual([]);
  });

  test("when there is already a user with the same email, return status 409 Conflict", async () => {
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
  test("when calling the api, return status 200 OK", async () => {
    // arrange
    await prisma.user.create({ data: createUserInput });
    const user = await prisma.user.findMany();
    // action
    const res = await mockApp.get("/user");
    // assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
  });

  test("when adding email filter, return status 200 OK", async () => {
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
  test("When editing users with the correct params, return status 200 OK", async () => {
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
