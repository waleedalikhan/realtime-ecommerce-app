import React, { Suspense } from "react";
import { View, StyleSheet } from "react-native";
import Products from "@/components/pages/products/index";
import { colors, spacing } from "@/lib/theme";

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

const styles = StyleSheet.create({
  fallback: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    paddingBottom: spacing.gap[8],
  },
  skeletonTitle: {
    height: 32,
    width: 192,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
  skeletonSubtitle: {
    marginTop: spacing.gap[4],
    height: 16,
    width: 280,
    borderRadius: 4,
    backgroundColor: colors.stone[800],
  },
  skeletonFilters: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    gap: spacing.gap[4],
  },
  skeletonFilter: {
    height: 40,
    width: 96,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
});
