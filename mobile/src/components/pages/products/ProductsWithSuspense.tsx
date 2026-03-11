import React, { Suspense } from "react";
import { View } from "react-native";
import Products from "@/components/pages/products/index";
import { productsWithSuspenseStyles as styles } from "@/styles/Products.styles";

const ProductsFallback: React.FC = () => (
  <View style={styles.fallback}>
    <View style={styles.skeletonTitle} />
    <View style={styles.skeletonSubtitle} />
    <View style={styles.skeletonFilters}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.skeletonFilter} />
      ))}
    </View>
  </View>
);

export default function ProductsWithSuspense() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <Products />
    </Suspense>
  );
}
