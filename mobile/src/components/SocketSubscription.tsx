import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";

export const SocketSubscription = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  useOrderUpdates(token);
  return null;
};
