import * as jose from "jose";

export async function generateJwtToken(payload) {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
  const jwt = await new jose.SignJWT(payload).sign(secret);
  return jwt;
}
