import React from "react";
import { View, Text, Pressable } from "react-native";
import { cartListItemStyles as styles } from "@/styles/Cart.styles";

type Props = {
  item: CartItem;
  onRemove?: ((id: string) => void) | undefined;
  onUpdateQuantity?: ((itemId: string, quantity: number) => void) | undefined;
  disabled?: boolean | undefined;
};

const CartListItem: React.FC<Props> = ({
  item,
  onRemove,
  onUpdateQuantity,
  disabled,
}) => (
  <View style={styles.row}>
    <View style={styles.info}>
      <Text style={styles.name}>{item.product.name}</Text>
      <Text style={styles.price}>${item.product.price} each</Text>
    </View>
    <View style={styles.actions}>
      <View style={styles.qtyWrap}>
        <Pressable
          onPress={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
          disabled={disabled}
          style={[styles.qtyBtn, disabled && styles.disabled]}
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </Pressable>
        <Text style={styles.qtyValue}>{item.quantity}</Text>
        <Pressable
          onPress={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
          disabled={disabled}
          style={[styles.qtyBtn, disabled && styles.disabled]}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => onRemove?.(item.id)}
        style={({ pressed }) => [styles.removeBtn, pressed && styles.pressed]}
      >
        <Text style={styles.removeText}>Remove</Text>
      </Pressable>
    </View>
  </View>
);

export default CartListItem;
