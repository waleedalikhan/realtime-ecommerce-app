"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { setConnected, setLastOrderUpdate } from "@/store/socketSlice";
import { queryKeys } from "@/lib/queryKeys";

/**
 * When user is logged in, connect Socket.io, join user room, listen for order.status_updated.
 * On event: dispatch to Redux and invalidate orders query so UI updates.
 * Cleanup: disconnect on unmount or when token is cleared.
 */
export function useOrderUpdates(token: string | null) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) {
      disconnectSocket();
      dispatch(setConnected(false));
      return;
    }
    const s = getSocket(token);
    if (!s) return;

    const onConnect = () => dispatch(setConnected(true));
    const onDisconnect = () => dispatch(setConnected(false));
    const onStatus = (payload: { orderId: string; status: string }) => {
      dispatch(setLastOrderUpdate(payload));
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      queryClient.invalidateQueries({ queryKey: queryKeys.order(payload.orderId) });
    };

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("order.status_updated", onStatus);

    if (s.connected) onConnect();

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("order.status_updated", onStatus);
      disconnectSocket();
      dispatch(setConnected(false));
    };
  }, [token, dispatch, queryClient]);
}
