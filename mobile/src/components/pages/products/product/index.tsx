import React from "react";
import { View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import useProduct from "@/hooks/useProduct";
import ProductPageStates from "@/components/pages/products/product/ProductPageStates";
import ProductImage from "@/components/pages/products/product/ProductImage";
import ProductDetails from "@/components/pages/products/product/ProductDetails";
import { productStyles as styles } from "@/styles/Product.styles";

const Product: React.FC = () => {
  const { product, isLoading, error, addToCart, productImageUrl } =
    useProduct();
  const router = useRouter();
  const imageUrl = product ? productImageUrl(product) : "";

  if (isLoading) return <ProductPageStates isLoading />;
  if (error || !product)
    return (
      <ProductPageStates error={error ?? null} product={product ?? null} />
    );

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
            description={product.description ?? ""}
            price={product.price}
            stock={product.stock}
            addToCart={addToCart}
          />
        </View>
      </View>
    </View>
  );
};

export default Product;
