"use client";
import React from "react";
import useProducts from "@/hooks/useProducts";
import ProductsPageStates from "@/components/pages/products/ProductsPageStates";
import ProductsFilters from "@/components/pages/products/ProductsFilters";
import ProductsSummary from "@/components/pages/products/ProductsSummary";
import ProductsGrid from "@/components/pages/products/ProductsGrid";
import ProductsPagination from "@/components/pages/products/ProductsPagination";

const Products: React.FC = () => {
  const { isLoading, error, isPending } = useProducts();
  if (isLoading) return <ProductsPageStates isLoading={isLoading} />;
  if (error) return <ProductsPageStates error={error} />;
  return (
    <div className="mx-auto max-w-6xl px-6 pb-12">
      <h1 className="text-2xl font-bold text-white">Products</h1>
      <p className="mt-1 text-stone-400">
        Browse our catalog. Search, filter, and sort to find what you need.
      </p>
      <ProductsFilters />
      <ProductsSummary />
      {isPending && <ProductsPageStates isPending={isPending} />}
      <ProductsGrid />
      <ProductsPagination />
    </div>
  );
};

export default Products;
