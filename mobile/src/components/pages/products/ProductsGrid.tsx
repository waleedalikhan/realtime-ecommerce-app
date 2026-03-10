import React from "react";
import { View, StyleSheet } from "react-native";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/pages/products/ProductCard";
import { spacing } from "@/lib/theme";

const ProductsGrid: React.FC = () => {
  const { data, productImageUrl } = useProducts();

  return (
    <View style={styles.grid}>
      {(data?.data ?? []).map((p) => (
        <View key={p.id} style={styles.cardWrap}>
          <ProductCard product={p} productImageUrl={productImageUrl} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gap[2],
  },
  cardWrap: {
    flex: 1,
    minWidth: 140,
    maxWidth: 400,
  },
});

export default ProductsGrid;
