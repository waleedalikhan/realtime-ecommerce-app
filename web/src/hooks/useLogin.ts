import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginBodySchema, type LoginBody } from "@repo/shared";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuth } from "@/store/authSlice";
import { api } from "@/lib/api";

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginBody>({
    resolver: zodResolver(loginBodySchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

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
      router.push("/products");
    } catch (e) {
      setError("root", { message: (e as Error).message });
    }
    setLoading(false);
  }

  return { reg, handleSubmit, errors, onSubmit, loading };
};

export default useLogin;
