import type { Request } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getToken } from "next-auth/jwt";

import HttpError from "../error";

export async function authenticationCheck(req: Request) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({
    req,
    secret: "RNhSa7yMYad0tp64xNhI/CWnPB/9neUnH7+fPFnba/w=",
  });
  if (token == null && process.env.NODE_ENV !== "test") {
    throw new HttpError("This is a protected route", 404);
  }
}
