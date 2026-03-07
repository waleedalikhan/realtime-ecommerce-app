/**
 * Product list: renders and shows loading then empty state when API returns no products.
 */
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders, queryClient } from "./test-utils";
import ProductsPage from "@/app/(web)/products/page";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    queryClient.clear();
  });

  it("shows loading then list with empty state when no products", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], total: 0, categories: [] }),
    });
    renderWithProviders(<ProductsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await screen.findByRole("heading", { name: "Products" });
    expect(
      screen.getByText(/No products match your filters/)
    ).toBeInTheDocument();
  });

  it("renders product names when API returns data", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          { id: "1", name: "Widget", price: 10, category: "tech", stock: 5 },
        ],
        total: 1,
        categories: ["tech"],
      }),
    });
    renderWithProviders(<ProductsPage />);
    await screen.findByRole("heading", { name: "Products" });
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });
});
