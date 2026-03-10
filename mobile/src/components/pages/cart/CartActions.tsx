import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/global/ui/Button";
import { spacing } from "@/lib/theme";

const CartActions: React.FC = () => (
  <View style={styles.wrap}>
    <Link href="/checkout" asChild>
      <Button variant="primary">Checkout</Button>
    </Link>
    <Link href="/products" asChild>
      <Button variant="outline">Continue shopping</Button>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    gap: spacing.gap[4],
  },
});

export default CartActions;
