import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/global/ui/Button";
import { productDetailsStyles as styles } from "@/styles/Product.styles";

type Props = {
  category?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  addToCart: () => void;
};

const ProductDetails: React.FC<Props> = ({
  category,
  name,
  description,
  price,
  stock,
  addToCart,
}) => {
  const desc = description ?? "No description available.";
  return (
    <View style={styles.wrap}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{desc}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${Number(price).toFixed(2)}</Text>
        {stock !== undefined && (
          <Text style={styles.stock}>
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <Button onPress={addToCart} disabled={stock === 0} variant="primary">
          Add to cart
        </Button>
      </View>
    </View>
  );
};

export default ProductDetails;
