/**
 * Unit test: hash utility. Same input produces same hash; different input produces different hash.
 * Covers password hashing used in register and login.
 */
import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../hash.js";

describe("hash", () => {
  it("hashes password and produced hash verifies for same input", async () => {
    const plain = "test-password-123";
    const hash = await hashPassword(plain);
    const ok = await verifyPassword(plain, hash);
    expect(ok).toBe(true);
  });

  it("different input produces hashes that don't verify crosswise", async () => {
    const hash1 = await hashPassword("password1");
    const hash2 = await hashPassword("password2");

    const ok1 = await verifyPassword("password1", hash2);
    const ok2 = await verifyPassword("password2", hash1);

    expect(ok1).toBe(false);
    expect(ok2).toBe(false);
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
