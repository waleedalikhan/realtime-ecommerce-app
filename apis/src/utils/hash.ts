import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash a plain password for storage. Never store plain passwords.
 * Used in register and (if we ever support) password change.
 */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Verify a plain password against a stored hash. Used in login.
 */
export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
