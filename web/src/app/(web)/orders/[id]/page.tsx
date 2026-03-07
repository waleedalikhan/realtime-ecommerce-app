"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";
import Link from "next/link";

type Order = {
  id: string;
  status: string;
  shippingAddress: string;
  contactEmail: string;
  items: { quantity: number; product: { name: string }; priceAt: number }[];
};

export default function OrderTrackingPage() {
  const params = useParams();
  const token = useSelector((s: RootState) => s.auth.token);
  const id = params.id as string;

  useOrderUpdates(token);

  const { data: order, isLoading } = useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => api<Order>(`/orders/${id}`, { token: token ?? undefined }),
    enabled: !!token && !!id,
  });

  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">Please log in to view this order.</p>
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
        <p className="text-stone-400">Loading order...</p>
      </div>
    );
  }
  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-stone-400">Order not found.</p>
        <Link
          href="/orders"
          className="mt-4 inline-block text-amber-400 hover:text-amber-300"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <Link
        href="/orders"
        className="text-sm font-medium text-stone-400 transition hover:text-white"
      >
        ← Back to orders
      </Link>
      <div className="mt-6 rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Order {order.id.slice(0, 8)}…
          </h1>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-400">
            {order.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-stone-500">
          Live updates when status changes.
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="text-stone-500">Shipping address</dt>
            <dd className="text-stone-300">{order.shippingAddress}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Contact email</dt>
            <dd className="text-stone-300">{order.contactEmail}</dd>
          </div>
        </dl>
        <h2 className="mt-6 font-semibold text-white">Items</h2>
        <ul className="mt-2 space-y-1 text-stone-400">
          {order.items.map((item, i) => (
            <li key={i}>
              {item.product.name} × {item.quantity}
              {item.priceAt != null && (
                <span className="text-stone-500"> · ${item.priceAt}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
