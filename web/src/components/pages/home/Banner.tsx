import Link from "next/link";
import Button from "@/components/global/ui/Button";

const Banner: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f24_1px,transparent_1px),linear-gradient(to_bottom,#1f1f24_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-400/90">
          Live inventory · Instant updates
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Commerce that moves at{" "}
          <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            the speed of now
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 md:text-xl">
          Checkout, track orders, and stay in sync—all in real time. No refresh,
          no guessing. Just what you need, when you need it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/products">
            <Button>Shop products</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Create account</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
