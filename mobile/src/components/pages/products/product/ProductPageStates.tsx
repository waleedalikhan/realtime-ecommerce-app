import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { colors, spacing, borderRadius } from "@/lib/theme";

type ProductPageStatesProps = {
  isLoading?: boolean;
  error?: Error | null;
  product?: Product | null;
};

const ProductPageStates: React.FC<ProductPageStatesProps> = ({
  isLoading,
  error,
  product,
}) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <View style={styles.skeleton}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonLine} />
            <View style={[styles.skeletonLine, { width: "75%" }]} />
            <View style={[styles.skeletonLine, { width: "100%" }]} />
            <View style={[styles.skeletonLine, { width: "66%" }]} />
            <View style={styles.skeletonBtn} />
          </View>
        </View>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.errorText}>
          {error?.message ?? "Product not found."}
        </Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back to products</Text>
        </Pressable>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  skeleton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
    flexDirection: "row",
  },
  skeletonImage: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: colors.stone[800],
  },
  skeletonContent: { flex: 1, padding: spacing.gap[8] },
  skeletonLine: {
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
    marginTop: spacing.gap[4],
  },
  skeletonBtn: {
    marginTop: spacing.gap[2],
    height: 40,
    width: 96,
    borderRadius: 8,
    backgroundColor: colors.stone[700],
  },
  errorText: { color: colors.red[400] },
  backBtn: { marginTop: spacing.gap[4] },
  backText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.amber[400],
  },
});

export default ProductPageStates;
