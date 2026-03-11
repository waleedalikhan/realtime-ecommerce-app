import React from "react";
import { Text } from "react-native";
import useProducts from "@/hooks/useProducts";
import { productsSummaryStyles as styles } from "@/styles/Products.styles";

const ProductsSummary: React.FC = () => {
  const { total, from, to } = useProducts();
  const message =
    total === 0
      ? "No products match your filters."
      : `Showing ${from} to ${to} of ${total} products`;
  return <Text style={styles.text}>{message}</Text>;
};

export default ProductsSummary;
