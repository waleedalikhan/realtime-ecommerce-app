"use client";
import Link from "next/link";
import useLogin from "@/hooks/useLogin";
import InputField from "@/components/global/ui/Input";
import { IconLoader } from "@/components/icons";
import Button from "@/components/global/ui/Button";

const LoginForm: React.FC = () => {
  const { reg, handleSubmit, errors, onSubmit, loading } = useLogin();

  return (
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">Log in</h1>
        <p className="mt-2 text-stone-400">
          Sign in to your account to continue.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            reg={reg}
            error={errors.email || null}
          />
          <InputField
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            reg={reg}
            error={errors.password || null}
          />
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}
          <Button
            type="submit"
            size="sm"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? <IconLoader /> : "Login"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-amber-400 transition hover:text-amber-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
