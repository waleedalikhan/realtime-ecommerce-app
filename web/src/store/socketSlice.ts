import { createSlice } from "@reduxjs/toolkit";

type SocketState = {
  connected: boolean;
  lastOrderUpdate: { orderId: string; status: string } | null;
};

const socketSlice = createSlice({
  name: "socket",
  initialState: { connected: false, lastOrderUpdate: null } as SocketState,
  reducers: {
    setConnected: (state, action: { payload: boolean }) => {
      state.connected = action.payload;
    },
    setLastOrderUpdate: (state, action: { payload: { orderId: string; status: string } }) => {
      state.lastOrderUpdate = action.payload;
    },
  },
});

export const { setConnected, setLastOrderUpdate } = socketSlice.actions;
export default socketSlice.reducer;
