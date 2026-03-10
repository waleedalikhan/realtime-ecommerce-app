import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

type CartListItemProps = {
  item: CartItem;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  disabled?: boolean;
};

const CartListItem: React.FC<CartListItemProps> = ({
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[4],
    marginBottom: spacing.gap[4],
  },
  info: {},
  name: { ...typography.fontMedium, color: colors.white },
  price: { ...typography.sm, color: colors.stone[500] },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.gap[2] },
  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[1],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.stone[600],
    backgroundColor: "rgba(41,37,36,0.4)",
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
  },
  qtyValue: {
    minWidth: 24,
    textAlign: "center",
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
  },
  disabled: { opacity: 0.5 },
  removeBtn: { paddingHorizontal: spacing.gap[2], paddingVertical: 6 },
  pressed: { opacity: 0.8 },
  removeText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.red[400],
  },
});

export default CartListItem;
