import crypto from "crypto";
import { CompactEncrypt } from "jose";

export async function generateJwtToken(customPayload) {
  const payload = {
    ...customPayload, // Spread any passed payload properties
    name: "Ang Wei Jun",
    email: "weijun.ang99@gmail.com",
    picture: "https://avatars.githubusercontent.com/u/95308604?v=4",
    sub: "95308604",
    role: "USER",
    userId: 1,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    jti: crypto.randomUUID(),
  };

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(payload));

  const base64Key = "RNhSa7yMYad0tp64xNhI/CWnPB/9neUnH7+fPFnba/w=";
  const keyBuffer = Buffer.from(base64Key, "base64");

  if (keyBuffer.length !== 32) {
    throw new Error("Key must be 256 bits (32 bytes)");
  }

  const secretKey = crypto.createSecretKey(keyBuffer);

  try {
    const jwt = await new CompactEncrypt(encodedData)
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(secretKey);

    return jwt;
  } catch (error) {
    console.error("Error encrypting token:", error);
    throw error; // Rethrow or handle the error as needed
  }
}
