import type { NextFunction, Request, Response } from "express";
import { getToken } from "next-auth/jwt";

import { assertUserExistsByMail } from "../../domain/user-validator";

export async function authenticationCheck(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({
    req,
    secret: "RNhSa7yMYad0tp64xNhI/CWnPB/9neUnH7+fPFnba/w=",
  });
  assertUserExistsByMail(token?.email!);
  next();
  //   res.end();
}
