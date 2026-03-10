import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useProducts from "@/hooks/useProducts";
import ProductsPageStates from "@/components/pages/products/ProductsPageStates";
import ProductsFilters from "@/components/pages/products/ProductsFilters";
import ProductsSummary from "@/components/pages/products/ProductsSummary";
import ProductsGrid from "@/components/pages/products/ProductsGrid";
import ProductsPagination from "@/components/pages/products/ProductsPagination";
import { colors, spacing, typography } from "@/lib/theme";

const Products: React.FC = () => {
  const { isLoading, error, data } = useProducts();

  if (isLoading) return <ProductsPageStates isLoading />;
  if (error) return <ProductsPageStates error={error} />;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.subtitle}>
        Browse our catalog. Search, filter, and sort to find what you need.
      </Text>
      <ProductsFilters />
      <ProductsSummary />
      <ProductsGrid />
      <ProductsPagination />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    paddingBottom: spacing.gap[8],
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  subtitle: {
    marginTop: spacing.gap[1],
    ...typography.base,
    color: colors.stone[400],
  },
});

export default Products;
