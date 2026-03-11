import {
  getStoredToken,
  setStoredTokens,
  clearStoredTokens,
} from "@/store/authStorage";

const BASE =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
  "http://localhost:4000";

export type ApiError = { message: string; statusCode?: number };

export const api = async <T>(
  path: string,
  options: RequestInit & { token?: string | null; skipRefresh?: boolean } = {}
): Promise<T> => {
  const { token: tokenOpt, skipRefresh, ...init } = options;
  let token = tokenOpt ?? (await getStoredToken("accessToken"));
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 401 && !skipRefresh) {
    const refresh = await getStoredToken("refreshToken");
    if (refresh) {
      const refreshRes = await fetch(`${BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
      });
      if (refreshRes.ok) {
        const data = (await refreshRes.json()) as {
          accessToken?: string;
          refreshToken?: string;
        };
        if (data.accessToken) {
          await setStoredTokens(
            data.accessToken,
            data.refreshToken ?? undefined
          );
          token = data.accessToken;
          headers["Authorization"] = `Bearer ${token}`;
          res = await fetch(`${BASE}${path}`, { ...init, headers });
        }
      } else {
        await clearStoredTokens();
        throw new Error("Session expired");
      }
    } else {
      await clearStoredTokens();
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as ApiError).message ?? "Request failed");
  }
  return res.json() as Promise<T>;
};
