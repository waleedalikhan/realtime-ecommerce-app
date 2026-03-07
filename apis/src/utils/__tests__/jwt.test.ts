/**
 * Unit test: JWT sign and verify. Access token payload is decoded correctly.
 * Covers token issuance (login/register) and middleware verification.
 */
import { describe, it, expect } from "vitest";
import { signAccessToken, signRefreshToken, verifyToken } from "../jwt.js";

const SECRET = "test-access-secret-min-32-characters-long";
const REFRESH_SECRET = "test-refresh-secret-min-32-characters-long";

describe("jwt", () => {
  it("signAccessToken and verifyToken round-trip", () => {
    const payload = { sub: "user-1", email: "u@example.com", role: "user" };
    const token = signAccessToken(payload, SECRET, "15m");
    expect(token).toBeTruthy();
    const decoded = verifyToken(token, SECRET);
    expect(decoded.sub).toBe(payload.sub);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.role).toBe(payload.role);
    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();
  });

  it("signRefreshToken and verifyToken round-trip", () => {
    const token = signRefreshToken({ sub: "user-1" }, REFRESH_SECRET, "7d");
    expect(token).toBeTruthy();
    const decoded = verifyToken<{ sub: string }>(token, REFRESH_SECRET);
    expect(decoded.sub).toBe("user-1");
  });

  it("verifyToken throws for wrong secret", () => {
    const token = signAccessToken({ sub: "u", email: "e@e.com", role: "user" }, SECRET, "15m");
    expect(() => verifyToken(token, "wrong-secret")).toThrow();
  });
});
