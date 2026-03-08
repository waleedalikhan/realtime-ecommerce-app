import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const useProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const token = useSelector((s: RootState) => s.auth.token);

  const getParams = (
    searchParams: ReturnType<typeof useSearchParams>,
    overrides: ParamsOverrides = {}
  ) => {
    return {
      page: overrides.page ?? (Number(searchParams.get("page")) || 1),
      limit: overrides.limit ?? (Number(searchParams.get("limit")) || 6),
      category:
        overrides.category !== undefined
          ? overrides.category
          : (searchParams.get("category") ?? undefined),
      sort:
        overrides.sort !== undefined
          ? overrides.sort
          : ((searchParams.get("sort") as "price_asc" | "price_desc") ??
            undefined),
      search:
        overrides.search !== undefined
          ? overrides.search
          : (searchParams.get("search") ?? undefined),
    };
  };

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

  const buildQueryString = (
    params: Record<string, string | number | undefined>
  ) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "" && v !== "all") q.set(k, String(v));
    });
    return q.toString();
  };

  const productImageUrl = (p: Product): string => {
    if (p.imageUrl) return p.imageUrl;
    const seed = encodeURIComponent(p.id);
    return `https://picsum.photos/seed/${seed}/400/300`;
  };

  const updateFilters = useCallback(
    (updates: {
      page?: number;
      limit?: number;
      category?: string;
      sort?: string;
      search?: string;
    }) => {
      const next = getParams(searchParams, updates);
      const qs = buildQueryString({
        page: next.page,
        limit: next.limit,
        category: next.category,
        sort: next.sort,
        search: next.search,
      });
      startTransition(() => {
        router.push(`/products${qs ? `?${qs}` : ""}`);
      });
    },
    [router, searchParams]
  );

  return {
    searchParams,
    router,
    isPending,
    updateFilters,
    getParams,
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
};

export default useProducts;
