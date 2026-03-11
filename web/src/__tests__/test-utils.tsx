import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import cartUiReducer from "@/store/cartUiSlice";
import socketReducer from "@/store/socketSlice";
import type { RootState } from "@/store";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      auth: authReducer as any,
      cartUi: cartUiReducer as any,
      socket: socketReducer as any,
    },
    preloadedState,
  });

const defaultStore = createStore();

const AllTheProviders = ({
  children,
  store = defaultStore,
}: {
  children: React.ReactNode;
  store?: ReturnType<typeof createStore>;
}) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    preloadedState?: Partial<RootState>;
  }
) => {
  const { preloadedState, ...renderOptions } = options ?? {};
  const store = preloadedState ? createStore(preloadedState) : defaultStore;
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders store={store}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};
