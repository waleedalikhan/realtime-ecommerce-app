import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import useOrders from "@/hooks/useOrders";
import AuthWall from "@/components/global/AuthWall";
import OrderEmpty from "@/components/pages/orders/OrderEmpty";
import OrderList from "@/components/pages/orders/OrderList";
import { colors, spacing, typography } from "@/lib/theme";

const Orders: React.FC = () => {
  const { orders, isLoading, lastOrderUpdate, refetch, token } = useOrders();

  useEffect(() => {
    if (lastOrderUpdate && token) refetch();
  }, [lastOrderUpdate, token, refetch]);

  if (!token) return <AuthWall message="Please log in to view your orders." />;
  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.loading}>Loading orders...</Text>
      </View>
    );
  }

  const list = orders ?? [];
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Orders</Text>
      <Text style={styles.subtitle}>
        Track your orders with live status updates.
      </Text>
      {list.length === 0 ? <OrderEmpty /> : <OrderList orders={list} />}
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

export default Orders;
