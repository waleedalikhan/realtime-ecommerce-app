"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import useAuth from "@/hooks/useAuth";
import { clearAuth } from "@/store/authSlice";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#0c0c0f] text-stone-100 antialiased flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-800/50 bg-[#0c0c0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Realtime Commerce
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/products"
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
            >
              Cart
            </Link>
            <Link
              href="/orders"
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
            >
              Orders
            </Link>
            <span className="mx-2 h-4 w-px bg-stone-700" />
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => dispatch(clearAuth())}
                className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-stone-800/60 hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12">{children}</main>

      <footer className="border-t border-stone-800/50 bg-stone-950/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <span className="text-sm font-medium text-stone-500">
            Realtime Commerce
          </span>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/products" className="text-stone-500 transition hover:text-stone-300">Products</Link>
            <Link href="/cart" className="text-stone-500 transition hover:text-stone-300">Cart</Link>
            <Link href="/orders" className="text-stone-500 transition hover:text-stone-300">Orders</Link>
            <Link href="/login" className="text-stone-500 transition hover:text-stone-300">Log in</Link>
            <Link href="/register" className="text-stone-500 transition hover:text-stone-300">Sign up</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
