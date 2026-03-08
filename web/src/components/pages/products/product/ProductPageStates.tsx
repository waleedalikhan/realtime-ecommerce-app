import Link from "next/link";

type Props = {
  isLoading?: boolean;
  error?: Error | null;
  product?: Product | null;
};

const ProductPageStates: React.FC<Props> = ({ isLoading, error, product }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="animate-pulse rounded-2xl border border-stone-800/80 bg-stone-900/40">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-4/3 bg-stone-800 md:aspect-square" />
            <div className="p-6 sm:p-8">
              <div className="h-3 w-16 rounded bg-stone-700" />
              <div className="mt-4 h-8 w-3/4 rounded bg-stone-700" />
              <div className="mt-4 h-4 w-full rounded bg-stone-700/80" />
              <div className="mt-2 h-4 w-2/3 rounded bg-stone-700/80" />
              <div className="mt-6 h-10 w-24 rounded bg-stone-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-red-400">
          {(error as Error)?.message ?? "Product not found."}
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block text-amber-400 hover:text-amber-300"
        >
          ← Back to products
        </Link>
      </div>
    );
  }
};

export default ProductPageStates;
