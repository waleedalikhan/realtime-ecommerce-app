import React from "react";
import { View } from "react-native";
import useProducts from "@/hooks/useProducts";
import ProductCard from "@/components/pages/products/ProductCard";
import { productsGridStyles as styles } from "@/styles/Products.styles";

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

export default ProductsGrid;
