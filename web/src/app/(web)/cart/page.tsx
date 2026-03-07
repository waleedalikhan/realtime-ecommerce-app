"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Link from "next/link";

type CartItem = {
  id: string;
  quantity: number;
  product: { id: string; name: string; price: number };
};
type Cart = { id: string; items: CartItem[] };

export default function CartPage() {
  const token = useSelector((s: RootState) => s.auth.token);
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useQuery({
    queryKey: queryKeys.cart(),
    queryFn: () => api<Cart>("/cart", { token: token ?? undefined }),
    enabled: !!token,
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: string) =>
      api(`/cart/items/${itemId}`, {
        method: "DELETE",
        token: token ?? undefined,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() }),
  });

  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">Please log in to view your cart.</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-stone-400">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <h1 className="text-2xl font-bold text-white">Cart</h1>
      <p className="mt-1 text-stone-400">Review your items before checkout.</p>
      {!cart?.items.length ? (
        <div className="mt-8 rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {cart.items.map((item: CartItem) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-stone-800/80 bg-stone-900/40 p-4"
              >
                <div>
                  <span className="font-medium text-white">
                    {item.product.name}
                  </span>
                  <span className="ml-2 text-stone-400">× {item.quantity}</span>
                  <p className="text-sm text-stone-500">
                    ${item.product.price} each
                  </p>
                </div>
                <button
                  onClick={() => removeMutation.mutate(item.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-stone-800 hover:text-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-4">
            <Link
              href="/checkout"
              className="rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
            >
              Checkout
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-stone-600 bg-stone-800/40 px-6 py-2.5 font-medium text-white transition hover:border-stone-500"
            >
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
