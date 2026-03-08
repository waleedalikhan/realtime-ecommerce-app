import Link from "next/link";

const OrderEmpty: React.FC = () => {
  return (
    <div className="mt-8 rounded-2xl border border-stone-800/80 bg-stone-900/40 p-8 text-center">
      <p className="text-stone-400">No orders yet.</p>
      <Link
        href="/products"
        className="mt-4 inline-block rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-[#0c0c0f] transition hover:bg-amber-400"
      >
        Shop products
      </Link>
    </div>
  );
};

export default OrderEmpty;
