import React from "react";
import { View, Text } from "react-native";
import { productsPageStatesStyles as styles } from "@/styles/Products.styles";

type Props = {
  isLoading?: boolean;
  error?: Error | null;
  isPending?: boolean;
};

const ProductsPageStates: React.FC<Props> = ({
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
              <View style={[styles.skeletonLine, styles.skeletonLineNarrow]} />
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

  if (isPending) return <Text style={styles.pending}>Updating…</Text>;

  return null;
};

export default ProductsPageStates;
