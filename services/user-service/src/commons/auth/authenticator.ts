import type { Request } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getToken } from "next-auth/jwt";

import HttpError from "../error";

async function extractToken(req: Request) {
  const token = await getToken({
    req,
  });
  if (token == null) {
    throw new HttpError("This is a protected route", 404);
  }
  return token;
}

function isAdmin(token) {
  return token.role === "ADMIN";
}

// assertIsAuthenticated
export async function assertIsAuthenticated(req: Request) {
  await extractToken(req);
}

// assertIsSelf
export async function assertIsSelfOrAdmin(req: Request, userId: number) {
  const token = await extractToken(req);
  if (userId !== token.userId && !isAdmin(token)) {
    throw new HttpError("You do not have the correct permission", 404);
  }
}

// assertIsAdmin
export async function assertIsAdmin(req: Request) {
  const token = await extractToken(req);
  if (!isAdmin(token)) {
    throw new HttpError("This requires admin permission", 404);
  }
}
