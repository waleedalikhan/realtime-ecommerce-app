type Props = {
  isLoading?: boolean;
  error?: Error | null;
  isPending?: boolean;
};

const ProductPageStates: React.FC<Props> = ({
  isLoading,
  error,
  isPending,
}) => {
  if (isLoading)
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="sr-only">Loading products...</p>
        <div className="h-8 w-48 animate-pulse rounded bg-stone-800" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-800/80 bg-stone-900/40 overflow-hidden"
            >
              <div className="aspect-4/3 bg-stone-800 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-stone-700 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-stone-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-red-400">{(error as Error).message}</p>
      </div>
    );

  if (isPending)
    return <p className="mt-2 text-sm text-amber-400/80">Updating…</p>;

  return null;
};

export default ProductPageStates;
