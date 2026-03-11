"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket, disconnectSocket } from "@/lib/socket";
import { setConnected, setLastOrderUpdate } from "@/store/socketSlice";
import { queryKeys } from "@/lib/queryKeys";

/**
 * When user is logged in, connect Socket.io, join user room, listen for order.status_updated.
 * On event: dispatch to Redux and update orders cache so UI updates in real time.
 * Cleanup: only disconnect when token is cleared (logout). Do not disconnect on unmount,
 * so the socket stays connected when navigating (e.g. from /orders/[id] to /orders).
 */
export const useOrderUpdates = (token: string | null) => {
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
      // Update orders list cache in place so /orders page re-renders immediately
      queryClient.setQueryData<{ id: string; status: string }[]>(
        queryKeys.orders(),
        (prev) =>
          prev?.map((o) =>
            o.id === payload.orderId ? { ...o, status: payload.status } : o
          ) ?? prev
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.order(payload.orderId),
      });
      queryClient.refetchQueries({
        queryKey: queryKeys.orders(),
        type: "all",
      });
    };

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("order.status_updated", onStatus);

    if (s.connected) onConnect();

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("order.status_updated", onStatus);
      // Do not disconnect here: this hook runs in both SocketSubscription and order
      // detail page. Disconnecting on unmount (e.g. leaving /orders/[id]) would kill
      // the socket so /orders no longer receives events. Only disconnect when token is null.
    };
  }, [token, dispatch, queryClient]);
};
