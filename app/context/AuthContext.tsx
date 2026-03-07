"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { api, getAccessToken, setTokens, clearTokens } from "@/api/client";

type User = { id: string; email: string; name: string | null; role: string };

type AuthState = { token: string | null; user: User | null; ready: boolean };

type AuthContextValue = AuthState & {
  login: (access: string, refresh: string | null, user: User) => Promise<void>;
  logout: () => Promise<void>;
  restore: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    ready: false,
  });

  const logout = useCallback(async () => {
    await clearTokens();
    setState({ token: null, user: null, ready: true });
  }, []);

  const login = useCallback(
    async (access: string, refresh: string | null, user: User) => {
      await setTokens(access, refresh);
      setState({ token: access, user, ready: true });
    },
    []
  );

  const restore = useCallback(async () => {
    const token = await getAccessToken();
    if (!token) {
      setState((s) => ({ ...s, ready: true }));
      return;
    }
    try {
      const user = await api<User>("/auth/me", { token, skipRefresh: true });
      setState({ token, user, ready: true });
    } catch {
      await clearTokens();
      setState({ token: null, user: null, ready: true });
    }
  }, []);

  useEffect(() => {
    restore();
  }, [restore]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, restore }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
