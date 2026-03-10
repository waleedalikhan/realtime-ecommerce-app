import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function useAuth() {
  const auth = useSelector((s: RootState) => s.auth);
  return { ...auth, isLoggedIn: !!(auth.token ?? auth.refreshToken) };
}
