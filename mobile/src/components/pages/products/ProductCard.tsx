import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

type ProductCardProps = {
  product: Product;
  productImageUrl: (p: Product) => string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  productImageUrl,
}) => {
  return (
    <Link href={`/products/${product.id}` as any} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
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
          <Text style={styles.price}>
            ${Number(product.price).toFixed(2)}
          </Text>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
  },
  pressed: { opacity: 0.95 },
  imageWrap: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  outOfStock: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
  body: { padding: spacing.gap[4] },
  name: {
    ...typography.base,
    ...typography.fontSemibold,
    color: colors.white,
  },
  price: {
    marginTop: spacing.gap[1],
    ...typography.base,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  meta: {
    marginTop: spacing.gap[1],
    ...typography.sm,
    color: colors.stone[500],
  },
  metaStock: { color: colors.stone[400] },
});

export default ProductCard;
