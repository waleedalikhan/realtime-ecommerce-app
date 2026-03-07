import { prisma } from "../lib/prisma.js";
import type { ProductsQuery } from "@repo/shared";

/**
 * List products with pagination, optional category filter, and sort by price.
 */
export async function listProducts(query: ProductsQuery) {
  const { page, limit, category, sort } = query;
  const skip = (page - 1) * limit;
  const where = category ? { category } : {};
  const orderBy = sort === "price_desc" ? { price: "desc" as const } : { price: "asc" as const };

  const [data, total] = await Promise.all([
    prisma.product.findMany({ where, skip, take: limit, orderBy }),
    prisma.product.count({ where }),
  ]);

  return { data, total, page, limit };
}

/**
 * Get a single product by id.
 */
export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;
  return product;
}
