import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { colors, typography } from "@/lib/theme";

type ProductImageProps = {
  imageUrl?: string;
  productName?: string;
  productStock?: number;
};

const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  productName,
  productStock,
}) => (
  <View style={styles.wrap}>
    <Image
      source={{ uri: imageUrl ?? "" }}
      style={styles.image}
      contentFit="cover"
    />
    {productStock === 0 && (
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Out of stock</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
});

export default ProductImage;
