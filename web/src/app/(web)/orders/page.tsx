"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Link from "next/link";

type Order = {
  id: string;
  status: string;
  createdAt: string;
  items: unknown[];
};

export default function OrdersPage() {
  const token = useSelector((s: RootState) => s.auth.token);

  const { data: orders, isLoading } = useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => api<Order[]>("/orders", { token: token ?? undefined }),
    enabled: !!token,
  });

  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">Please log in to view your orders.</p>
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
        <p className="text-stone-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <p className="mt-1 text-stone-400">
        Track your orders with live status updates.
      </p>
      {!orders?.length ? (
        <div className="mt-8 rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">No orders yet.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
          >
            Shop products
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/orders/${o.id}`}
                className="block rounded-xl border border-stone-800/80 bg-stone-900/40 p-4 transition hover:border-stone-700 hover:bg-stone-900/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-stone-300">
                    {o.id.slice(0, 8)}…
                  </span>
                  <span className="rounded-full bg-stone-700/80 px-3 py-0.5 text-sm font-medium text-stone-300">
                    {o.status}
                  </span>
                </div>
                {o.createdAt && (
                  <p className="mt-1 text-sm text-stone-500">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
