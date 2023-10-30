import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, raw: true });
  if (token) {
    return Response.json(token);
  }
  return Response.redirect("/");
}
