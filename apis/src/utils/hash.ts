import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash a plain password for storage. Never store plain passwords.
 * Used in register and (if we ever support) password change.
 */
export const hashPassword = async (plain: string): Promise<string> =>
  bcrypt.hash(plain, SALT_ROUNDS);

/**
 * Verify a plain password against a stored hash. Used in login.
 */
export const verifyPassword = async (
  plain: string,
  hash: string
): Promise<boolean> => bcrypt.compare(plain, hash);
