import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { productPageStatesStyles as styles } from "@/styles/Product.styles";

type Props = {
  isLoading?: boolean;
  error?: Error | null;
  product?: Product | null;
};

const ProductPageStates: React.FC<Props> = ({ isLoading, error, product }) => {
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

export default ProductPageStates;
