import Link from "next/link";
import Button from "@/components/global/ui/Button";

const CTAStrip: React.FC = () => {
  return (
    <section className="border-t border-stone-800/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Ready to shop in real time?
        </h2>
        <p className="mt-3 text-stone-400">
          Create an account or browse products—no commitment required.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/products">
            <Button variant="secondary" className="py-3.5!">
              Browse products
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" className="py-3!">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;
