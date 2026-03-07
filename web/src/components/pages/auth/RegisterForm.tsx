"use client";
import Link from "next/link";
import InputField from "@/components/global/ui/Input";
import Button from "@/components/global/ui/Button";
import useRegister from "@/hooks/useRegister";
import { IconLoader } from "@/components/icons";

const RegisterForm: React.FC = () => {
  const { reg, handleSubmit, errors, onSubmit, loading } = useRegister();

  return (
    <div className="mx-auto max-w-md px-6">
      <div className="rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-stone-400">
          Register to shop and track orders in real time.
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
          <InputField
            label="Name (optional)"
            id="name"
            type="text"
            placeholder="Your name"
            reg={reg}
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
            {loading ? <IconLoader /> : "Register"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-400 transition hover:text-amber-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
