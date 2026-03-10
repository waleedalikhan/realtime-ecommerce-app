import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginBodySchema, type LoginBody } from "@repo/shared";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { setAuth } from "@/store/authSlice";
import { setStoredTokens } from "@/store/authStorage";
import { api } from "@/lib/api";

export default function useLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<LoginBody>({
    resolver: zodResolver(loginBodySchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: LoginBody) {
    setLoading(true);
    try {
      const res = await api<{
        accessToken: string;
        refreshToken: string;
        user: unknown;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      await setStoredTokens(res.accessToken, res.refreshToken);
      dispatch(
        setAuth({
          token: res.accessToken,
          refreshToken: res.refreshToken,
          user: res.user as {
            id: string;
            email: string;
            name: string | null;
            role: string;
          },
        })
      );
      router.replace("/products");
    } catch (e) {
      setError("root", { message: (e as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return { reg, handleSubmit, errors, onSubmit, loading, control };
}
