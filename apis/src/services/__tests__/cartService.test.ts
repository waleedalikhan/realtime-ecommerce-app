import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppError } from "../../utils/errors.js";
import type { AddCartItemBody } from "@repo/shared";
import { prisma } from "../../lib/prisma.js";
import { addCartItem } from "../cartService.js";

vi.mock("@/lib/prisma.js", () => ({
  prisma: {
    product: { findUnique: vi.fn() },
    cart: { findUnique: vi.fn(), create: vi.fn() },
    cartItem: { findUnique: vi.fn(), create: vi.fn(), findMany: vi.fn() },
  },
}));

const mockUserId = "user-1";
const mockCartId = "cart-1";
const mockProductId = "product-1";

describe("cartService", () => {
  beforeEach(() => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.cart.findUnique).mockResolvedValue({
      id: mockCartId,
      userId: mockUserId,
      updatedAt: new Date(),
      items: [],
    } as never);
  });

  it("addCartItem throws AppError 404 when product not found", async () => {
    const body: AddCartItemBody = { productId: mockProductId, quantity: 1 };
    await expect(addCartItem(mockUserId, body)).rejects.toThrow(AppError);
    await expect(addCartItem(mockUserId, body)).rejects.toMatchObject({
      statusCode: 404,
      message: "Product not found",
    });
  });
});
