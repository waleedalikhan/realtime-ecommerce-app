/**
 * App error with statusCode for consistent API error responses.
 * Global error middleware maps this to JSON: { statusCode, message, details? }.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}
