import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: { id: string; email: string; name: string | null; role: string } | null;
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
      return action.payload;
    },
    clearAuth() {
      return initialState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
