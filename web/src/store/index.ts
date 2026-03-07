import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartUiReducer from "./cartUiSlice";
import socketReducer from "./socketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cartUi: cartUiReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
