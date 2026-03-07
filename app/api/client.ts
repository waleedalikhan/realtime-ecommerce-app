/**
 * API client: base URL from env, attach Bearer token from secure storage.
 * On 401: try refresh token once and retry; otherwise clear storage and signal logout.
 * Used by all screens for REST calls.
 */
import * as SecureStore from "expo-secure-store";

const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function setTokens(access: string, refresh: string | null): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_KEY, access);
  if (refresh) await SecureStore.setItemAsync(REFRESH_KEY, refresh);
}

export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

export type ApiError = { message: string; statusCode?: number };

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string | null; skipRefresh?: boolean } = {}
): Promise<T> {
  const { token: tokenOpt, skipRefresh, ...init } = options;
  let token = tokenOpt ?? (await getAccessToken());
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 401 && !skipRefresh) {
    const refresh = await getRefreshToken();
    if (refresh) {
      const refreshRes = await fetch(`${BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
      });
      if (refreshRes.ok) {
        const data = (await refreshRes.json()) as { accessToken?: string; refreshToken?: string };
        if (data.accessToken) {
          await setTokens(data.accessToken, data.refreshToken ?? null);
          token = data.accessToken;
          headers["Authorization"] = `Bearer ${token}`;
          res = await fetch(`${BASE}${path}`, { ...init, headers });
        }
      } else {
        await clearTokens();
        throw new Error("Session expired");
      }
    } else {
      await clearTokens();
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as ApiError).message ?? "Request failed");
  }
  return res.json() as Promise<T>;
}
