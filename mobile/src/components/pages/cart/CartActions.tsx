import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/global/ui/Button";
import { cartActionsStyles as styles } from "@/styles/Cart.styles";

const CartActions: React.FC = () => (
  <View style={styles.wrap}>
    <Link href="/checkout" asChild>
      <Button variant="primary">Checkout</Button>
    </Link>
    <Link href="/products" asChild>
      <Button variant="outline">Continue shopping</Button>
    </Link>
  </View>
);

export default CartActions;
