type Props = {
  item: CartItem;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  disabled?: boolean;
};

const CartListItem: React.FC<Props> = ({
  item,
  onRemove,
  onUpdateQuantity,
  disabled,
}) => {
  return (
    <li
      key={item.id}
      className="flex sm:items-center sm:justify-between rounded-xl border border-stone-800/80 bg-stone-900/40 p-4 sm:flex-row flex-col sm:gap-0 gap-4"
    >
      <div>
        <span className="font-medium text-white">{item.product.name}</span>
        <p className="text-sm text-stone-500">${item.product.price} each</p>
      </div>
      <div className="flex items-center gap-3 sm:justify-start justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-stone-600 bg-stone-800/40">
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
            disabled={disabled}
            aria-label="Decrease quantity"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-stone-300 transition hover:bg-stone-800 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            −
          </button>
          <span className="min-w-6 text-center text-sm font-medium text-stone-300">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
            disabled={disabled}
            aria-label="Increase quantity"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-stone-300 transition hover:bg-stone-800 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => onRemove?.(item.id)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-stone-800 hover:text-red-300"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartListItem;
