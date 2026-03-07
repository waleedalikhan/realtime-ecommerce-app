"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useTransition } from "react";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string | null;
};

type ProductsResponse = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  categories: string[];
};

function getParams(
  searchParams: ReturnType<typeof useSearchParams>,
  overrides: {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
    search?: string;
  } = {}
) {
  return {
    page: overrides.page ?? (Number(searchParams.get("page")) || 1),
    limit: overrides.limit ?? (Number(searchParams.get("limit")) || 12),
    category:
      overrides.category !== undefined
        ? overrides.category
        : (searchParams.get("category") ?? undefined),
    sort:
      overrides.sort !== undefined
        ? overrides.sort
        : ((searchParams.get("sort") as "price_asc" | "price_desc") ??
          undefined),
    search:
      overrides.search !== undefined
        ? overrides.search
        : (searchParams.get("search") ?? undefined),
  };
}

function buildQueryString(params: Record<string, string | number | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== "all") q.set(k, String(v));
  });
  return q.toString();
}

/** Placeholder image when product has no imageUrl (stable per product) */
function productImageUrl(p: Product): string {
  if (p.imageUrl) return p.imageUrl;
  const seed = encodeURIComponent(p.id);
  return `https://picsum.photos/seed/${seed}/400/300`;
}

export default function ProductsPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = useSelector((s: RootState) => s.auth.token);

  const { page, limit, category, sort, search } = getParams(searchParams, {});
  const params = {
    page,
    limit,
    ...(category && category !== "all" && { category }),
    ...(sort && { sort }),
    ...(search && search.trim() && { search: search.trim() }),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () =>
      api<ProductsResponse>(
        `/products?${new URLSearchParams(params as Record<string, string>).toString()}`,
        { token: token ?? undefined }
      ),
  });

  const updateFilters = useCallback(
    (updates: {
      page?: number;
      limit?: number;
      category?: string;
      sort?: string;
      search?: string;
    }) => {
      const next = getParams(searchParams, updates);
      const qs = buildQueryString({
        page: next.page,
        limit: next.limit,
        category: next.category,
        sort: next.sort,
        search: next.search,
      });
      startTransition(() => {
        router.push(`/products${qs ? `?${qs}` : ""}`);
      });
    },
    [router, searchParams]
  );

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="sr-only">Loading products...</p>
        <div className="h-8 w-48 animate-pulse rounded bg-stone-800" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-800/80 bg-stone-900/40 overflow-hidden"
            >
              <div className="aspect-[4/3] bg-stone-800 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-stone-700 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-stone-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-red-400">{(error as Error).message}</p>
      </div>
    );
  }

  const categories = data?.categories ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-12">
      <h1 className="text-2xl font-bold text-white">Products</h1>
      <p className="mt-1 text-stone-400">
        Browse our catalog. Search, filter, and sort to find what you need.
      </p>

      {/* Search, filter, sort */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <form
          className="flex flex-1 min-w-[200px] max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const searchInput = form.querySelector<HTMLInputElement>(
              'input[name="search"]'
            );
            updateFilters({ search: searchInput?.value ?? "", page: 1 });
          }}
        >
          <input
            type="search"
            name="search"
            defaultValue={search ?? ""}
            placeholder="Search products..."
            className="w-full rounded-l-xl border border-stone-600 bg-stone-800/60 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="rounded-r-xl border border-l-0 border-stone-600 bg-stone-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-600"
          >
            Search
          </button>
        </form>

        <label className="flex items-center gap-2 text-sm text-stone-400">
          Category
          <span className="relative inline-block">
            <select
              value={category ?? "all"}
              onChange={(e) =>
                updateFilters({ category: e.target.value, page: 1 })
              }
              className="appearance-none cursor-pointer rounded-xl border border-stone-600 bg-stone-800/60 pl-3 pr-8 py-2 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              aria-label="Filter by category"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex items-center gap-2 text-sm text-stone-400">
          Sort
          <span className="relative inline-block">
            <select
              value={sort ?? "price_asc"}
              onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
              className="appearance-none cursor-pointer rounded-xl border border-stone-600 bg-stone-800/60 pl-3 pr-8 py-2 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              aria-label="Sort by"
            >
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
          </span>
        </label>
      </div>

      {isPending && <p className="mt-2 text-sm text-amber-400/80">Updating…</p>}

      {/* Results summary */}
      <p className="mt-4 text-sm text-stone-500">
        {total === 0
          ? "No products match your filters."
          : `Showing ${from}–${to} of ${total} products`}
      </p>

      {/* Product grid */}
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(data?.data ?? []).map((p) => (
          <li key={p.id}>
            <Link
              href={`/products/${p.id}`}
              className="group block overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/40 transition hover:border-stone-600 hover:bg-stone-900/70 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-800">
                <img
                  src={productImageUrl(p)}
                  alt=""
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {p.stock === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-white group-hover:text-amber-400 transition">
                  {p.name}
                </h2>
                <p className="mt-1 text-amber-400 font-medium">
                  ${Number(p.price).toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {p.category}
                  {p.stock > 0 && (
                    <span className="ml-2 text-stone-400">
                      · {p.stock} in stock
                    </span>
                  )}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination bar at bottom */}
      {total > 0 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-700/80 bg-stone-900/40 px-4 py-3"
          aria-label="Products pagination"
        >
          <p className="text-sm text-stone-500">
            {total === 0 ? "No products" : `Showing ${from}–${to} of ${total}`}
            <span className="ml-2 text-stone-600">·</span>
            <span className="ml-2">
              Page {page} of {totalPages}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-stone-400">
              Per page
              <select
                value={limit}
                onChange={(e) =>
                  updateFilters({ limit: Number(e.target.value), page: 1 })
                }
                className="appearance-none cursor-pointer rounded-lg border border-stone-600 bg-stone-800/60 pl-2.5 pr-7 py-1.5 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                aria-label="Items per page"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </label>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Link
                  href={`/products?${buildQueryString({
                    page: 1,
                    limit,
                    category: category ?? "all",
                    sort: sort ?? "price_asc",
                    search: search ?? "",
                  })}`}
                  className={`min-w-[2.25rem] rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
                    page <= 1
                      ? "pointer-events-none text-stone-600"
                      : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                  }`}
                  aria-label="First page"
                  aria-disabled={page <= 1}
                >
                  «
                </Link>
                <Link
                  href={`/products?${buildQueryString({
                    page: page - 1,
                    limit,
                    category: category ?? "all",
                    sort: sort ?? "price_asc",
                    search: search ?? "",
                  })}`}
                  className={`min-w-[2.25rem] rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
                    page <= 1
                      ? "pointer-events-none text-stone-600"
                      : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                  }`}
                  aria-label="Previous page"
                  aria-disabled={page <= 1}
                >
                  ‹
                </Link>
                {(() => {
                  const pages: (number | "ellipsis")[] = [];
                  const add = (p: number) => {
                    if (
                      p >= 1 &&
                      p <= totalPages &&
                      pages[pages.length - 1] !== p
                    )
                      pages.push(p);
                  };
                  add(1);
                  if (page > 3) pages.push("ellipsis");
                  for (
                    let i = Math.max(1, page - 2);
                    i <= Math.min(totalPages, page + 2);
                    i++
                  )
                    add(i);
                  if (page < totalPages - 2 && totalPages > 1)
                    pages.push("ellipsis");
                  if (totalPages > 1) add(totalPages);
                  return pages.map((item, i) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-1.5 py-1.5 text-stone-500"
                        aria-hidden
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={item}
                        href={`/products?${buildQueryString({
                          page: item,
                          limit,
                          category: category ?? "all",
                          sort: sort ?? "price_asc",
                          search: search ?? "",
                        })}`}
                        className={`min-w-[2.25rem] rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
                          page === item
                            ? "bg-amber-500 text-[#0c0c0f]"
                            : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                        }`}
                        aria-label={`Page ${item}`}
                        aria-current={page === item ? "page" : undefined}
                      >
                        {item}
                      </Link>
                    )
                  );
                })()}
                <Link
                  href={`/products?${buildQueryString({
                    page: page + 1,
                    limit,
                    category: category ?? "all",
                    sort: sort ?? "price_asc",
                    search: search ?? "",
                  })}`}
                  className={`min-w-[2.25rem] rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
                    page >= totalPages
                      ? "pointer-events-none text-stone-600"
                      : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                  }`}
                  aria-label="Next page"
                  aria-disabled={page >= totalPages}
                >
                  ›
                </Link>
                <Link
                  href={`/products?${buildQueryString({
                    page: totalPages,
                    limit,
                    category: category ?? "all",
                    sort: sort ?? "price_asc",
                    search: search ?? "",
                  })}`}
                  className={`min-w-[2.25rem] rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
                    page >= totalPages
                      ? "pointer-events-none text-stone-600"
                      : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                  }`}
                  aria-label="Last page"
                  aria-disabled={page >= totalPages}
                >
                  »
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
