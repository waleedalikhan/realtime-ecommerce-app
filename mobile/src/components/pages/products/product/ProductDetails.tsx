import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/components/global/ui/Button";
import { colors, spacing, typography } from "@/lib/theme";

type ProductDetailsProps = {
  category?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  addToCart?: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  category,
  name,
  description,
  price,
  stock,
  addToCart,
}) => {
  const desc = description ?? "No description available.";
  return (
    <View style={styles.wrap}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{desc}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${Number(price).toFixed(2)}</Text>
        {stock !== undefined && (
          <Text style={styles.stock}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <Button onPress={addToCart} disabled={stock === 0} variant="primary">
          Add to cart
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: spacing.gap[8],
    justifyContent: "center",
  },
  category: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: "rgba(251,191,36,0.9)",
    textTransform: "uppercase",
  },
  name: {
    marginTop: spacing.gap[2],
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  description: {
    marginTop: spacing.gap[4],
    fontSize: 16,
    color: colors.stone[400],
    lineHeight: 24,
  },
  priceRow: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: spacing.gap[2],
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
  },
  stock: {
    fontSize: 14,
    color: colors.stone[500],
  },
  actions: { marginTop: spacing.gap[8] },
});

export default ProductDetails;
