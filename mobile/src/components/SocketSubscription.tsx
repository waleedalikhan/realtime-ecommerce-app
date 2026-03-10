import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";

/** When user is logged in, keep Socket connected and subscribe to order updates. */
export function SocketSubscription() {
  const token = useSelector((s: RootState) => s.auth.token);
  useOrderUpdates(token);
  return null;
}
