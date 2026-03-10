import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function useOrders() {
  const token = useSelector((s: RootState) => s.auth.token);
  const lastOrderUpdate = useSelector(
    (s: RootState) => s.socket.lastOrderUpdate
  );

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => api<Order[]>("/orders", { token: token ?? undefined }),
    enabled: !!token,
  });

  return { orders, isLoading, lastOrderUpdate, refetch, token };
}
