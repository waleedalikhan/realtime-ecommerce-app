import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { productImageStyles as styles } from "@/styles/Product.styles";

type Props = {
  imageUrl?: string;
  productName?: string;
  productStock?: number;
};

const ProductImage: React.FC<Props> = ({
  imageUrl,
  productName,
  productStock,
}) => (
  <View style={styles.wrap}>
    <Image
      source={{ uri: imageUrl ?? "" }}
      style={styles.image}
      contentFit="cover"
      alt={productName ?? ""}
    />
    {productStock === 0 && (
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Out of stock</Text>
      </View>
    )}
  </View>
);

export default ProductImage;
