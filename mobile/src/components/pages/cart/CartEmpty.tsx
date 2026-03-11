import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { cartEmptyStyles as styles } from "@/styles/Cart.styles";

const CartEmpty: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.text}>Your cart is empty.</Text>
    <Link href="/products" asChild>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        <Text style={styles.btnText}>Browse products</Text>
      </Pressable>
    </Link>
  </View>
);

export default CartEmpty;
