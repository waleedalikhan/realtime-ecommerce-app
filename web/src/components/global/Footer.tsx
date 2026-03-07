import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-800/50 bg-stone-950/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <span className="text-sm font-medium text-stone-500">
          Realtime Commerce
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/products"
            className="text-stone-500 transition hover:text-stone-300"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="text-stone-500 transition hover:text-stone-300"
          >
            Cart
          </Link>
          <Link
            href="/orders"
            className="text-stone-500 transition hover:text-stone-300"
          >
            Orders
          </Link>
          <Link
            href="/login"
            className="text-stone-500 transition hover:text-stone-300"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-stone-500 transition hover:text-stone-300"
          >
            Sign up
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
