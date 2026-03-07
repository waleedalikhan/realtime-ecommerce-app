/**
 * Checkout form: shows validation errors for invalid input (Zod schema from shared).
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import CheckoutPage from "@/app/checkout/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("CheckoutPage", () => {
  const preloadedState = {
    auth: {
      token: "fake-token",
      refreshToken: null,
      user: { id: "1", email: "u@t.com", name: null, role: "user" },
    },
    cartUi: { drawerOpen: false },
    socket: { connected: false, lastOrderUpdate: null },
  };

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (typeof url === "string" && url.includes("/checkout")) {
        return Promise.resolve({ ok: true, json: async () => ({ id: "ord-1" }) });
      }
      return Promise.reject(new Error("unmocked"));
    });
  });

  it("shows validation errors when submitting empty form", async () => {
    renderWithProviders(<CheckoutPage />, { preloadedState });
    const submit = screen.getByRole("button", { name: /place order/i });
    fireEvent.click(submit);
    await waitFor(() => {
      expect(screen.getByText(/Shipping address is required/i)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /place order/i })).toBeInTheDocument();
  });
});
