import React from "react";
import { View, Text } from "react-native";
import AuthWall from "@/components/global/AuthWall";
import CartEmpty from "@/components/pages/cart/CartEmpty";
import CartList from "@/components/pages/cart/CartList";
import CartActions from "@/components/pages/cart/CartActions";
import useCart from "@/hooks/useCart";
import { cartStyles as styles } from "@/styles/Cart.styles";

const Cart: React.FC = () => {
  const { token, cart, isLoading, removeMutation, updateMutation } = useCart();

  if (!token) return <AuthWall message="Please log in to view your cart." />;
  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.loading}>Loading cart...</Text>
      </View>
    );
  }

  const empty = !cart?.items?.length;
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.subtitle}>Review your items before checkout.</Text>
      {empty ? (
        <CartEmpty />
      ) : (
        <>
          <CartList
            cart={cart!}
            onRemove={(id) => removeMutation.mutate(id)}
            onUpdateQuantity={(itemId, quantity) =>
              updateMutation.mutate({ itemId, quantity })
            }
            isUpdating={updateMutation.isPending}
          />
          <CartActions />
        </>
      )}
    </View>
  );
};

export default Cart;
