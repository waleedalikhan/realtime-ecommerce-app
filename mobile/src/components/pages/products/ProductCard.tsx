import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { productCardStyles as styles } from "@/styles/Products.styles";

type Props = {
  product: Product;
  productImageUrl: (p: Product) => string;
};

const ProductCard: React.FC<Props> = ({ product, productImageUrl }) => {
  return (
    <Link href={`/products/${product.id}` as any} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: productImageUrl(product) }}
            style={styles.image}
            contentFit="cover"
          />
          {product.stock === 0 && (
            <View style={styles.outOfStock}>
              <Text style={styles.outOfStockText}>Out of stock</Text>
            </View>
          )}
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
          <Text style={styles.meta}>
            {product.category}
            {product.stock > 0 && (
              <Text style={styles.metaStock}> · {product.stock} in stock</Text>
            )}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default ProductCard;
