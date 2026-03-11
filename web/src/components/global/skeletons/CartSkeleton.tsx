import React from "react";

const CartSkeleton: React.FC = () => {
  return (
    <div
      className="flex h-full flex-col gap-6"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading cart"
    >
      <div className="space-y-2">
        <div className="h-6 w-32 rounded bg-stone-800/80" aria-hidden="true" />
        <div className="h-4 w-56 rounded bg-stone-900/80" aria-hidden="true" />
      </div>

      <div className="flex-1 space-y-4 overflow-hidden">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="flex gap-4 rounded-xl border border-stone-800/80 bg-stone-900/60 p-4"
            aria-hidden="true"
          >
            <div className="h-20 w-20 shrink-0 rounded-lg bg-stone-800" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-3/4 rounded bg-stone-800" />
              <div className="h-3 w-1/2 rounded bg-stone-900" />
              <div className="mt-2 flex gap-3">
                <div className="h-8 w-20 rounded-full bg-stone-800" />
                <div className="h-8 w-16 rounded-full bg-stone-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2" aria-hidden="true">
        <div className="h-10 w-full rounded-xl bg-stone-800" />
        <div className="h-10 w-40 rounded-xl bg-stone-900" />
      </div>
    </div>
  );
};

export default CartSkeleton;
