import { IconLI, IconOT, IconSC } from "@/components/icons";

const features: any[] = [
  {
    icon: <IconLI />,
    title: "Live inventory",
    description:
      "Stock levels update instantly. No stale carts or surprise sold-outs.",
  },
  {
    icon: <IconOT />,
    title: "Order tracking",
    description:
      "Follow your order from payment to delivery with live status updates.",
  },
  {
    icon: <IconSC />,
    title: "Secure checkout",
    description:
      "Pay with confidence. Your data is protected every step of the way.",
  },
];

const Features: React.FC = () => {
  return (
    <section className="border-t border-stone-800/50 bg-stone-950/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
          Why Realtime
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 transition hover:border-stone-700 hover:bg-stone-900/60"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition group-hover:bg-amber-500/20">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-stone-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
