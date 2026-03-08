import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: { id: string; email: string; name: string | null; role: string } | null;
};

export const getToken = (type?: "accessToken" | "refreshToken") => {
  return typeof window !== "undefined"
    ? localStorage.getItem(type ?? "accessToken")
    : null;
};

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(_, action: { payload: AuthState }) {
      if (typeof window !== "undefined") {
        if (action.payload.token)
          localStorage.setItem("accessToken", action.payload.token);
        if (action.payload.refreshToken)
          localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
      return action.payload;
    },
    clearAuth() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload();
      }
      return initialState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
