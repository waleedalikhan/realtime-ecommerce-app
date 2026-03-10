import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

type ProductsPageStatesProps = {
  isLoading?: boolean;
  error?: Error | null;
  isPending?: boolean;
};

const ProductsPageStates: React.FC<ProductsPageStatesProps> = ({
  isLoading,
  error,
  isPending,
}) => {
  if (isLoading)
    return (
      <View style={styles.loading}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonLine} />
              <View style={[styles.skeletonLine, { width: "50%" }]} />
            </View>
          ))}
        </View>
      </View>
    );

  if (error)
    return (
      <View style={styles.errorWrap}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );

  if (isPending)
    return <Text style={styles.pending}>Updating…</Text>;

  return null;
};

const styles = StyleSheet.create({
  loading: {
    paddingVertical: spacing.gap[8],
    paddingHorizontal: spacing.px,
  },
  skeletonTitle: {
    height: 32,
    width: 192,
    borderRadius: 4,
    backgroundColor: colors.stone[800],
  },
  skeletonGrid: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gap[2],
  },
  skeletonCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
    width: "30%",
    minWidth: 140,
  },
  skeletonImage: {
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
  },
  skeletonLine: {
    height: 20,
    margin: spacing.gap[2],
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
  errorWrap: { paddingHorizontal: spacing.px },
  errorText: { color: colors.red[400] },
  pending: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: "rgba(251,191,36,0.8)",
  },
});

export default ProductsPageStates;
