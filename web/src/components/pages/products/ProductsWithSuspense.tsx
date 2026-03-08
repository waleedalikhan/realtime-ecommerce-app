"use client";

import React, { Suspense } from "react";
import Products from "./index";

const ProductsFallback = () => (
  <div className="mx-auto max-w-6xl px-6 pb-12">
    <div className="h-8 w-48 animate-pulse rounded bg-stone-700" />
    <div className="mt-4 h-4 w-96 animate-pulse rounded bg-stone-800" />
    <div className="mt-8 flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 w-24 animate-pulse rounded bg-stone-700" />
      ))}
    </div>
  </div>
);

const SafeSuspense = Suspense as React.ComponentType<{
  fallback: React.ReactNode;
  children: React.ReactNode;
}>;

export default function ProductsWithSuspense() {
  return (
    <SafeSuspense fallback={<ProductsFallback />}>
      <Products />
    </SafeSuspense>
  );
}
