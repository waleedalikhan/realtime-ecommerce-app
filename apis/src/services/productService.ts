import { prisma } from "../lib/prisma.js";
import type { ProductsQuery } from "@repo/shared";

/**
 * List products with pagination, optional category filter, search, and sort by price.
 */
export const listProducts = async (query: ProductsQuery) => {
  const { page, limit, category, sort, search } = query;
  const skip = (page - 1) * limit;

  const term = search?.trim();
  const where = {
    ...(category ? { category } : {}),
    ...(term
      ? {
          OR: [
            { name: { contains: term, mode: "insensitive" as const } },
            { description: { contains: term, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const orderBy =
    sort === "price_desc"
      ? { price: "desc" as const }
      : { price: "asc" as const };

  const [data, total, categories] = await Promise.all([
    prisma.product.findMany({ where, skip, take: limit, orderBy }),
    prisma.product.count({ where }),
    prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    categories: categories.map((c) => c.category),
  };
};

/**
 * Get a single product by id.
 */
export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;
  return product;
};
