import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/errors.js";
import type { AddCartItemBody, UpdateCartItemBody } from "@repo/shared";

/**
 * Get or create cart for user; return cart with items and product details.
 */
export async function getCart(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: { include: { product: true } },
      },
    });
  }
  return cart;
}

/**
 * Add item to cart (or increment quantity if same product). Creates cart if needed.
 */
export async function addCartItem(userId: string, body: AddCartItemBody) {
  const product = await prisma.product.findUnique({
    where: { id: body.productId },
  });
  if (!product) throw new AppError(404, "Product not found");
  if (product.stock < body.quantity)
    throw new AppError(400, "Insufficient stock");

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: body.productId } },
  });
  if (existing) {
    const newQty = existing.quantity + body.quantity;
    if (product.stock < newQty) throw new AppError(400, "Insufficient stock");
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: body.productId,
        quantity: body.quantity,
      },
    });
  }
  return getCart(userId);
}

/**
 * Update cart item quantity. If 0, remove item.
 */
export async function updateCartItem(
  userId: string,
  itemId: string,
  body: UpdateCartItemBody
) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError(404, "Cart not found");

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
  });
  if (!item) throw new AppError(404, "Cart item not found");

  if (body.quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (product && product.stock < body.quantity)
      throw new AppError(400, "Insufficient stock");
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: body.quantity },
    });
  }
  return getCart(userId);
}

/**
 * Remove cart item.
 */
export async function removeCartItem(userId: string, itemId: string) {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new AppError(404, "Cart not found");

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cartId: cart.id },
  });
  if (!item) throw new AppError(404, "Cart item not found");

  await prisma.cartItem.delete({ where: { id: itemId } });
  return getCart(userId);
}
