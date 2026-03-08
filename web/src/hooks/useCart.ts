import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const useCart = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useQuery({
    queryKey: queryKeys.cart(),
    queryFn: () => api<Cart>("/cart", { token: token ?? undefined }),
    enabled: !!token,
  });
  const removeMutation = useMutation({
    mutationFn: (itemId: string) =>
      api(`/cart/items/${itemId}`, {
        method: "DELETE",
        token: token ?? undefined,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api<Cart>(`/cart/items/${itemId}`, {
        method: "PATCH",
        token: token ?? undefined,
        body: JSON.stringify({ quantity }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.cart() }),
    onError: (e) => toast.error((e as Error).message),
  });

  return { token, cart, isLoading, removeMutation, updateMutation };
};

export default useCart;
