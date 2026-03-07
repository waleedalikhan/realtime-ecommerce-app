"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutBodySchema, type CheckoutBody } from "@repo/shared";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import Link from "next/link";

export default function CheckoutPage() {
  const token = useSelector((s: RootState) => s.auth.token);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CheckoutBody>({
    resolver: zodResolver(checkoutBodySchema),
  });

  async function onSubmit(data: CheckoutBody) {
    if (!token) return;
    try {
      const order = await api<{ id: string }>("/checkout", {
        method: "POST",
        token,
        body: JSON.stringify(data),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      router.push(`/orders/${order.id}`);
    } catch (e) {
      setError("root", { message: (e as Error).message });
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-6">
        <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
          <p className="text-stone-400">Please log in to checkout.</p>
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

  return (
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">Checkout</h1>
        <p className="mt-2 text-stone-400">
          Enter shipping and contact details.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-stone-300"
            >
              Shipping address
            </label>
            <input
              id="shippingAddress"
              {...reg("shippingAddress")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="Street, city, postal code"
            />
            {errors.shippingAddress && (
              <p className="mt-1 text-sm text-red-400">
                {errors.shippingAddress.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-stone-300"
            >
              Contact email
            </label>
            <input
              id="contactEmail"
              type="email"
              {...reg("contactEmail")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="you@example.com"
            />
            {errors.contactEmail && (
              <p className="mt-1 text-sm text-red-400">
                {errors.contactEmail.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-stone-300"
            >
              Contact phone (optional)
            </label>
            <input
              id="contactPhone"
              {...reg("contactPhone")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="+1 234 567 8900"
            />
          </div>
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
          >
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}
