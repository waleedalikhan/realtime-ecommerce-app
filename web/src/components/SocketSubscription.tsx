"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";

/** When user is logged in, keep Socket connected and subscribe to order updates so any page can show live data. */
export function SocketSubscription() {
  const token = useSelector((s: RootState) => s.auth.token);
  useOrderUpdates(token);
  return null;
}
