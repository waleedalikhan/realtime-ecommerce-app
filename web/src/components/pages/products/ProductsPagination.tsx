import React from "react";
import Link from "next/link";
import useProducts from "@/hooks/useProducts";

type PEProps = {
  totalPages: number;
  page: number;
  buildQueryString: (
    params: Record<string, string | number | undefined>
  ) => string;
  category: string | undefined;
  sort: string | undefined;
  search: string | undefined;
  limit: number;
};

const PaginationEllipsis: React.FC<PEProps> = ({
  totalPages,
  page,
  buildQueryString,
  category,
  sort,
  search,
  limit,
}) => {
  const pages: (number | "ellipsis")[] = [];
  const add = (p: number) => {
    if (p >= 1 && p <= totalPages && pages[pages.length - 1] !== p)
      pages.push(p);
  };

  add(1);

  if (page > 3) pages.push("ellipsis");

  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++)
    add(i);

  if (page < totalPages - 2 && totalPages > 1) pages.push("ellipsis");
  if (totalPages > 1) add(totalPages);
  return (
    <span className="hidden sm:flex sm:items-center sm:gap-1">
      {pages.map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-1.5 py-1.5 text-stone-500"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={`/products?${buildQueryString({
              page: item,
              limit,
              category: category ?? "all",
              sort: sort ?? "price_asc",
              search: search ?? "",
            })}`}
            className={`min-w-9 rounded-lg px-2.5 py-1.5 text-center text-sm font-medium transition ${
              page === item
                ? "bg-amber-500 text-[#0c0c0f]"
                : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
            }`}
            aria-label={`Page ${item}`}
            aria-current={page === item ? "page" : undefined}
          >
            {item}
          </Link>
        )
      )}
    </span>
  );
};

const ProductsPagination: React.FC = () => {
  const {
    total,
    from,
    to,
    page,
    totalPages,
    limit,
    updateFilters,
    buildQueryString,
    category,
    sort,
    search,
  } = useProducts();

  if (total)
    return (
      <nav
        className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between rounded-xl border border-stone-700/80 bg-stone-900/40 px-3 py-3 sm:px-4"
        aria-label="Products pagination"
      >
        <p className="text-xs sm:text-sm text-stone-500 shrink-0">
          {total === 0 ? "No products" : `Showing ${from}–${to} of ${total}`}
          <span className="mx-1.5 sm:ml-2 text-stone-600">·</span>
          <span>
            Page {page} of {totalPages}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-3">
          <label className="flex items-center gap-2 text-xs sm:text-sm text-stone-400">
            <span className="whitespace-nowrap">Per page</span>
            <select
              value={limit}
              onChange={(e) =>
                updateFilters({ limit: Number(e.target.value), page: 1 })
              }
              className="appearance-none cursor-pointer rounded-lg border border-stone-600 bg-stone-800/60 pl-2 pr-6 py-1.5 sm:pl-2.5 sm:pr-7 text-xs sm:text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              aria-label="Items per page"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </label>
          {totalPages > 1 && (
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Link
                href={`/products?${buildQueryString({
                  page: 1,
                  limit,
                  category: category ?? "all",
                  sort: sort ?? "price_asc",
                  search: search ?? "",
                })}`}
                className={`min-w-8 sm:min-w-9 rounded-lg px-2 sm:px-2.5 py-1.5 text-center text-sm font-medium transition ${
                  page <= 1
                    ? "pointer-events-none text-stone-600"
                    : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                }`}
                aria-label="First page"
                aria-disabled={page <= 1}
              >
                «
              </Link>
              <Link
                href={`/products?${buildQueryString({
                  page: page - 1,
                  limit,
                  category: category ?? "all",
                  sort: sort ?? "price_asc",
                  search: search ?? "",
                })}`}
                className={`min-w-8 sm:min-w-9 rounded-lg px-2 sm:px-2.5 py-1.5 text-center text-sm font-medium transition ${
                  page <= 1
                    ? "pointer-events-none text-stone-600"
                    : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                }`}
                aria-label="Previous page"
                aria-disabled={page <= 1}
              >
                ‹
              </Link>
              <PaginationEllipsis
                totalPages={totalPages}
                page={page}
                buildQueryString={buildQueryString}
                category={category}
                sort={sort}
                search={search}
                limit={limit}
              />
              <Link
                href={`/products?${buildQueryString({
                  page: page + 1,
                  limit,
                  category: category ?? "all",
                  sort: sort ?? "price_asc",
                  search: search ?? "",
                })}`}
                className={`min-w-8 sm:min-w-9 rounded-lg px-2 sm:px-2.5 py-1.5 text-center text-sm font-medium transition ${
                  page >= totalPages
                    ? "pointer-events-none text-stone-600"
                    : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                }`}
                aria-label="Next page"
                aria-disabled={page >= totalPages}
              >
                ›
              </Link>
              <Link
                href={`/products?${buildQueryString({
                  page: totalPages,
                  limit,
                  category: category ?? "all",
                  sort: sort ?? "price_asc",
                  search: search ?? "",
                })}`}
                className={`min-w-8 sm:min-w-9 rounded-lg px-2 sm:px-2.5 py-1.5 text-center text-sm font-medium transition ${
                  page >= totalPages
                    ? "pointer-events-none text-stone-600"
                    : "text-stone-400 hover:bg-stone-700/60 hover:text-white"
                }`}
                aria-label="Last page"
                aria-disabled={page >= totalPages}
              >
                »
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
};

export default ProductsPagination;
