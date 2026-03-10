import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthWall from "@/components/global/AuthWall";
import CartEmpty from "@/components/pages/cart/CartEmpty";
import CartList from "@/components/pages/cart/CartList";
import CartActions from "@/components/pages/cart/CartActions";
import useCart from "@/hooks/useCart";
import { colors, spacing, typography } from "@/lib/theme";

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

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  loading: { fontSize: 16, color: colors.stone[400] },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: colors.stone[400],
  },
});

export default Cart;
