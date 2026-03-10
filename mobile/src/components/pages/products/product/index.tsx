import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import useProduct from "@/hooks/useProduct";
import ProductPageStates from "@/components/pages/products/product/ProductPageStates";
import ProductImage from "@/components/pages/products/product/ProductImage";
import ProductDetails from "@/components/pages/products/product/ProductDetails";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const Product: React.FC = () => {
  const { product, isLoading, error, addToCart, productImageUrl } =
    useProduct();
  const router = useRouter();
  const imageUrl = product ? productImageUrl(product) : "";

  if (isLoading) return <ProductPageStates isLoading />;
  if (error || !product)
    return <ProductPageStates error={error ?? undefined} product={product ?? null} />;

  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backLink}>← Back to products</Text>
      </Pressable>
      <View style={styles.article}>
        <View style={styles.grid}>
          <ProductImage
            imageUrl={imageUrl}
            productName={product.name}
            productStock={product.stock}
          />
          <ProductDetails
            category={product.category}
            name={product.name}
            description={product.description ?? undefined}
            price={product.price}
            stock={product.stock}
            addToCart={addToCart}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  backLink: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  article: {
    marginTop: spacing.gap[2],
    overflow: "hidden",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
  },
  grid: {
    flexDirection: "column",
  },
});

export default Product;
