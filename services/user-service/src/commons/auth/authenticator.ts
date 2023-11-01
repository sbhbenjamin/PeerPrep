import type { Request } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getToken } from "next-auth/jwt";

import HttpError from "../error";

export async function authenticationCheck(req: Request) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(token);
  if (token == null && process.env.NODE_ENV !== "test") {
    throw new HttpError("This is a protected route", 404);
  }
}
