"use client";

import React, { useEffect, useState } from "react";
import useProducts from "@/hooks/useProducts";
import Select from "@/components/global/ui/Select";

const ProductsFilters: React.FC = () => {
  const { updateFilters, search, category, categories, sort } = useProducts();
  const [searchInput, setSearchInput] = useState(search ?? "");

  useEffect(() => {
    setSearchInput(search ?? "");
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = searchInput.trim();
    updateFilters({ search: value, page: 1 });
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <form
        className="flex flex-1 min-w-[200px] max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          name="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-l-xl border border-stone-600 bg-stone-800/60 px-4 py-2.5 text-white placeholder-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="rounded-r-xl border border-l-0 border-stone-600 bg-stone-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-600"
        >
          Search
        </button>
      </form>

      <label className="flex items-center gap-2 text-sm text-stone-400">
        Category
        <span className="relative inline-block">
          <Select
            value={category ?? "all"}
            onChange={(e) =>
              updateFilters({ category: e.target.value, page: 1 })
            }
            options={[
              { value: "all", label: "All" },
              ...(categories ?? []).map((c) => ({ value: c, label: c })),
            ]}
            ariaLabel="Filter by category"
          />
        </span>
      </label>

      <label className="flex items-center gap-2 text-sm text-stone-400">
        Sort
        <span className="relative inline-block">
          <select
            value={sort ?? "price_asc"}
            onChange={(e) => updateFilters({ sort: e.target.value, page: 1 })}
            className="appearance-none cursor-pointer rounded-xl border border-stone-600 bg-stone-800/60 pl-3 pr-8 py-2 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            aria-label="Sort by"
          >
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </select>
        </span>
      </label>
    </div>
  );
};

export default ProductsFilters;
