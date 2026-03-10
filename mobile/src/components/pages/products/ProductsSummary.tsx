import React from "react";
import { Text, StyleSheet } from "react-native";
import useProducts from "@/hooks/useProducts";
import { colors, spacing, typography } from "@/lib/theme";

const ProductsSummary: React.FC = () => {
  const { total, from, to } = useProducts();
  const message =
    total === 0
      ? "No products match your filters."
      : `Showing ${from} to ${to} of ${total} products`;
  return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: spacing.gap[4],
    ...typography.sm,
    color: colors.stone[500],
  },
});

export default ProductsSummary;
