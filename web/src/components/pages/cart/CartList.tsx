import CartListItem from "@/components/pages/cart/CartListItem";

type Props = {
  cart: Cart;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  isUpdating?: boolean;
};

const CartList: React.FC<Props> = ({
  cart,
  onRemove,
  onUpdateQuantity,
  isUpdating,
}) => {
  return (
    <ul className="mt-8 space-y-4">
      {cart.items.map((item: CartItem) => (
        <CartListItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
          disabled={isUpdating}
        />
      ))}
    </ul>
  );
};

export default CartList;
