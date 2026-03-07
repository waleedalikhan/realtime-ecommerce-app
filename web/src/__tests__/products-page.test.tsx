/**
 * Product list: renders and shows loading then empty state when API returns no products.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import ProductsPage from "@/app/products/page";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("shows loading then list with empty state when no products", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [], total: 0 }),
    });
    renderWithProviders(<ProductsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/Products/i)).toBeInTheDocument();
  });

  it("renders product names when API returns data", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [{ id: "1", name: "Widget", price: 10, category: "tech", stock: 5 }],
        total: 1,
      }),
    });
    renderWithProviders(<ProductsPage />);
    await screen.findByText(/Products/i);
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });
});
