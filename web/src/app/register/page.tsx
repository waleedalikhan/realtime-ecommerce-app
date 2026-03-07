"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerBodySchema, type RegisterBody } from "@repo/shared";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setAuth } from "@/store/authSlice";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register: reg, handleSubmit, formState: { errors }, setError } = useForm<RegisterBody>({
    resolver: zodResolver(registerBodySchema),
  });

  async function onSubmit(data: RegisterBody) {
    try {
      const res = await api<{ accessToken: string; refreshToken: string; user: unknown }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      dispatch(setAuth({
        token: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user as { id: string; email: string; name: string | null; role: string },
      }));
      router.push("/products");
    } catch (e) {
      setError("root", { message: (e as Error).message });
    }
  }

  return (
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-stone-400">Register to shop and track orders in real time.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-300">Email</label>
            <input
              id="email"
              type="email"
              {...reg("email")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-300">Password</label>
            <input
              id="password"
              type="password"
              {...reg("password")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-300">Name (optional)</label>
            <input
              id="name"
              {...reg("name")}
              className="mt-1 block w-full rounded-xl border border-stone-700 bg-stone-800 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="Your name"
            />
          </div>
          {errors.root && <p className="text-sm text-red-400">{errors.root.message}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-amber-400 transition hover:text-amber-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
