import Link from "next/link";

type Props = {
  order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <li key={order.id}>
      <Link
        href={`/orders/${order.id}`}
        className="block rounded-xl border border-stone-800/80 bg-stone-900/40 p-4 transition hover:border-stone-700 hover:bg-stone-900/60"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-stone-300">
            {order.id.slice(0, 8)}…
          </span>
          <span className="rounded-full bg-stone-700/80 px-3 py-0.5 text-sm font-medium text-stone-300">
            {order.status}
          </span>
        </div>
        {order.createdAt && (
          <p className="mt-1 text-sm text-stone-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        )}
      </Link>
    </li>
  );
};

export default OrderItem;
