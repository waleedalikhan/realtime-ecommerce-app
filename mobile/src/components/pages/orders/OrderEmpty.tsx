import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { orderEmptyStyles as styles } from "@/styles/Orders.styles";

const OrderEmpty: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.text}>No orders yet.</Text>
    <Link href="/products" asChild>
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Shop products</Text>
      </Pressable>
    </Link>
  </View>
);

export default OrderEmpty;
