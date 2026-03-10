import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutBodySchema, type CheckoutBody } from "@repo/shared";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export default function useCheckout() {
  const token = useSelector((s: RootState) => s.auth.token);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<CheckoutBody>({
    resolver: zodResolver(checkoutBodySchema),
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: CheckoutBody) {
    if (!token) return;
    setLoading(true);
    try {
      const order = await api<{ id: string }>("/checkout", {
        method: "POST",
        token,
        body: JSON.stringify(data),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      router.replace(`/orders/${order.id}` as any);
    } catch (e) {
      setError("root", { message: (e as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return { reg, handleSubmit, errors, onSubmit, token, loading, control };
}
