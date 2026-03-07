"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type Product = { id: string; name: string; price: number; category: string; stock: number };

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const token = useSelector((s: RootState) => s.auth.token);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const category = searchParams.get("category") ?? undefined;
  const sort = (searchParams.get("sort") as "price_asc" | "price_desc") ?? undefined;

  const params = { page, limit, ...(category && { category }), ...(sort && { sort }) };
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () =>
      api<{ data: Product[]; total: number }>(
        `/products?${new URLSearchParams(params as Record<string, string>).toString()}`,
        { token: token ?? undefined }
      ),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-stone-400">Loading products...</p>
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

  return (
    <div className="mx-auto max-w-6xl px-6">
      <h1 className="text-2xl font-bold text-white">Products</h1>
      <p className="mt-1 text-stone-400">Browse our catalog. Live inventory updates.</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((p) => (
          <li key={p.id}>
            <Link
              href={`/products/${p.id}`}
              className="block rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 transition hover:border-stone-700 hover:bg-stone-900/60"
            >
              <h2 className="font-semibold text-white">{p.name}</h2>
              <p className="mt-2 text-stone-400">
                ${p.price} · {p.category}
              </p>
              {p.stock !== undefined && (
                <p className="mt-1 text-sm text-stone-500">
                  {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {data && data.total > limit && (
        <div className="mt-8 flex gap-4">
          {page > 1 && (
            <Link
              href={`/products?page=${page - 1}`}
              className="rounded-xl border border-stone-600 bg-stone-800/40 px-4 py-2 text-sm font-medium text-white transition hover:border-stone-500"
            >
              Previous
            </Link>
          )}
          {page * limit < data.total && (
            <Link
              href={`/products?page=${page + 1}`}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
