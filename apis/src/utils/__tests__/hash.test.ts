/**
 * Unit test: hash utility. Same input produces same hash; different input produces different hash.
 * Covers password hashing used in register and login.
 */
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../hash.js";

describe("hash", () => {
  it("hashes password and same input produces same hash", async () => {
    const plain = "test-password-123";
    const hash1 = await hashPassword(plain);
    const hash2 = await hashPassword(plain);
    expect(hash1).toBe(hash2);
  });

  it("different input produces different hash", async () => {
    const hash1 = await hashPassword("password1");
    const hash2 = await hashPassword("password2");
    expect(hash1).not.toBe(hash2);
  });

  it("verifyPassword returns true for correct password", async () => {
    const plain = "secret";
    const hash = await hashPassword(plain);
    const ok = await verifyPassword(plain, hash);
    expect(ok).toBe(true);
  });

  it("verifyPassword returns false for wrong password", async () => {
    const hash = await hashPassword("correct");
    const ok = await verifyPassword("wrong", hash);
    expect(ok).toBe(false);
  });
});
