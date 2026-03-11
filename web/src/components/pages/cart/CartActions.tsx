import Link from "next/link";

const CartActions: React.FC = () => {
  return (
    <div className="mt-8 flex gap-4 sm:flex-row flex-col sm:text-left text-center">
      <Link
        href="/checkout"
        className="rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
      >
        Checkout
      </Link>
      <Link
        href="/products"
        className="rounded-xl border border-stone-600 bg-stone-800/40 px-6 py-2.5 font-medium text-white transition hover:border-stone-500"
      >
        Continue shopping
      </Link>
    </div>
  );
};

export default CartActions;
