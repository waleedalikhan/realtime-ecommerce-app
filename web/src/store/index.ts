import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import cartUiReducer from "@/store/cartUiSlice";
import socketReducer from "@/store/socketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cartUi: cartUiReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
