/**
 * Subscribe to order.status_updated for the current user. Connect Socket with token,
 * invalidate/refetch order list and specific order on event. Cleanup on unmount or when token is cleared.
 */
import { useEffect, useRef } from "react";
import { getSocket, disconnectSocket } from "@/socket/client";

type OrderUpdatePayload = { orderId: string; status: string };

export function useOrderUpdates(
  token: string | null,
  onUpdate: (payload: OrderUpdatePayload) => void
) {
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      return;
    }
    const s = getSocket(token);
    const handler = (payload: OrderUpdatePayload) => onUpdateRef.current(payload);
    s.on("order.status_updated", handler);
    return () => {
      s.off("order.status_updated", handler);
      disconnectSocket();
    };
  }, [token]);
}
