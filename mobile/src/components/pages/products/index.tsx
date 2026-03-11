import React from "react";
import { View, Text } from "react-native";
import useProducts from "@/hooks/useProducts";
import ProductsPageStates from "@/components/pages/products/ProductsPageStates";
import ProductsFilters from "@/components/pages/products/ProductsFilters";
import ProductsSummary from "@/components/pages/products/ProductsSummary";
import ProductsGrid from "@/components/pages/products/ProductsGrid";
import ProductsPagination from "@/components/pages/products/ProductsPagination";
import { productsStyles as styles } from "@/styles/Products.styles";

const Products: React.FC = () => {
  const { isLoading, error } = useProducts();

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

export default Products;
