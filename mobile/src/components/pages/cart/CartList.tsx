import React from "react";
import { View } from "react-native";
import CartListItem from "@/components/pages/cart/CartListItem";
import { cartListStyles as styles } from "@/styles/Cart.styles";

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
}) => (
  <View style={styles.list}>
    {cart.items.map((item) => (
      <CartListItem
        key={item.id}
        item={item}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
        disabled={isUpdating}
      />
    ))}
  </View>
);

export default CartList;
