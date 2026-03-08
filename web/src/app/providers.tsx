"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { store } from "@/store";
import { SocketSubscription } from "@/components/SocketSubscription";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SocketSubscription />
        {children}
        <Toaster richColors position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  );
}
