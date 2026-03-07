"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-24 md:pt-12 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f24_1px,transparent_1px),linear-gradient(to_bottom,#1f1f24_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/90">
            Live inventory · Instant updates
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Commerce that moves at{" "}
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              the speed of now
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 md:text-xl">
            Checkout, track orders, and stay in sync—all in real time. No
            refresh, no guessing. Just what you need, when you need it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-[#0c0c0f] shadow-[0_0_0_1px_rgba(251,191,36,0.3)] transition hover:bg-amber-400 hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)]"
            >
              Shop products
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-600 bg-stone-800/40 px-6 py-3.5 text-base font-semibold text-white transition hover:border-stone-500 hover:bg-stone-800/70"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-stone-800/50 bg-stone-950/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Why Realtime
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Live inventory",
                description:
                  "Stock levels update instantly. No stale carts or surprise sold-outs.",
                icon: (
                  <svg
                    className="h-6 w-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
              },
              {
                title: "Order tracking",
                description:
                  "Follow your order from payment to delivery with live status updates.",
                icon: (
                  <svg
                    className="h-6 w-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Secure checkout",
                description:
                  "Pay with confidence. Your data is protected every step of the way.",
                icon: (
                  <svg
                    className="h-6 w-6 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.5A6.5 6.5 0 0112 3c1.912 0 3.605.834 4.75 2.086 1.146 1.252 1.855 2.96 1.855 4.75 0 3.59-2.91 6.5-6.5 6.5H4.5"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 transition hover:border-stone-700 hover:bg-stone-900/60"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition group-hover:bg-amber-500/20">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-stone-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-stone-800/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to shop in real time?
          </h2>
          <p className="mt-3 text-stone-400">
            Create an account or browse products—no commitment required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-stone-800 px-6 py-3 font-semibold text-white transition hover:bg-stone-700"
            >
              Browse products
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
