import { useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type SearchParams = {
  page?: string;
  limit?: string;
  category?: string;
  sort?: string;
  search?: string;
};

function getParams(
  params: SearchParams,
  overrides: ParamsOverrides = {}
): {
  page: number;
  limit: number;
  category: string | undefined;
  sort: "price_asc" | "price_desc" | undefined;
  search: string | undefined;
} {
  return {
    page: overrides.page ?? (Number(params.page) || 1),
    limit: overrides.limit ?? (Number(params.limit) || 6),
    category:
      overrides.category !== undefined
        ? overrides.category
        : (params.category ?? undefined),
    sort:
      overrides.sort !== undefined
        ? overrides.sort
        : ((params.sort as "price_asc" | "price_desc") ?? undefined),
    search:
      overrides.search !== undefined
        ? overrides.search
        : (params.search ?? undefined),
  };
}

function buildQueryString(params: Record<string, string | number | undefined>) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== "all") q.set(k, String(v));
  });
  return q.toString();
}

export default function useProducts() {
  const router = useRouter();
  const searchParams = useLocalSearchParams<SearchParams>();
  const token = useSelector((s: RootState) => s.auth.token);

  const { page, limit, category, sort, search } = getParams(searchParams, {});
  const params = {
    page,
    limit,
    ...(category && category !== "all" && { category }),
    ...(sort && { sort }),
    ...(search && search.trim() && { search: search.trim() }),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.products(params),
    queryFn: () =>
      api<ProductsResponse>(
        `/products?${new URLSearchParams(params as unknown as Record<string, string>).toString()}`,
        { token: token ?? undefined }
      ),
  });

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const categories = data?.categories ?? [];

  const updateFilters = useCallback(
    (updates: ParamsOverrides) => {
      const next = getParams(searchParams, updates);
      const qs = buildQueryString({
        page: next.page,
        limit: next.limit,
        category: next.category,
        sort: next.sort,
        search: next.search,
      });
      router.push(`/products${qs ? `?${qs}` : ""}` as any);
    },
    [router, searchParams]
  );

  const productImageUrl = (p: Product): string => {
    if (p.imageUrl) return p.imageUrl;
    return `https://picsum.photos/seed/${encodeURIComponent(p.id)}/400/300`;
  };

  return {
    searchParams,
    router,
    updateFilters,
    getParams: (o?: ParamsOverrides) => getParams(searchParams, o),
    buildQueryString,
    productImageUrl,
    data,
    isLoading,
    error,
    page,
    limit,
    category,
    sort,
    search,
    total,
    totalPages,
    from,
    to,
    categories,
  };
}
