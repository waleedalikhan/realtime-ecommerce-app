import React from "react";
import { View, StyleSheet } from "react-native";
import CartListItem from "@/components/pages/cart/CartListItem";
import { spacing } from "@/lib/theme";

type CartListProps = {
  cart: Cart;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  isUpdating?: boolean;
};

const CartList: React.FC<CartListProps> = (props) => (
  <View style={styles.list}>
    {props.cart.items.map((item) => (
      <CartListItem
        key={item.id}
        item={item}
        onRemove={props.onRemove}
        onUpdateQuantity={props.onUpdateQuantity}
        disabled={props.isUpdating}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: { marginTop: spacing.gap[8] },
});

export default CartList;
