import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import Button from "@/components/global/ui/Button";
import { cartActionsStyles as styles } from "@/styles/Cart.styles";
import { closeDrawer } from "@/store/cartUiSlice";

const CartActions: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(closeDrawer());
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    dispatch(closeDrawer());
    router.push("/products");
  };

  return (
    <View style={styles.wrap}>
      <Button variant="primary" onPress={handleCheckout}>
        Checkout
      </Button>
      <Button variant="outline" onPress={handleContinueShopping}>
        Continue shopping
      </Button>
    </View>
  );
};

export default CartActions;
