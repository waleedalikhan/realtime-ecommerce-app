"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { openDrawer } from "@/store/cartUiSlice";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  stock: number;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((s: RootState) => s.auth.token);
  const id = params.id as string;

  const { data: product, isLoading, error } = useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => api<Product>(`/products/${id}`),
  });

  async function addToCart() {
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await api(`/cart/items`, {
        method: "POST",
        token,
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      dispatch(openDrawer());
    } catch (e) {
      alert((e as Error).message);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-stone-400">Loading...</p>
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-red-400">{(error as Error)?.message ?? "Product not found."}</p>
        <Link href="/products" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <Link
        href="/products"
        className="text-sm font-medium text-stone-400 transition hover:text-white"
      >
        ← Back to products
      </Link>
      <div className="mt-6 rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">{product.name}</h1>
        <p className="mt-2 text-stone-400">{product.description ?? "No description."}</p>
        <p className="mt-4 text-lg font-medium text-white">
          ${product.price} <span className="text-stone-500">· {product.category}</span>
        </p>
        {product.stock !== undefined && (
          <p className="mt-1 text-sm text-stone-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        )}
        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className="mt-6 rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Add to cart"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
