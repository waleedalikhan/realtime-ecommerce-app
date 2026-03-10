import React from "react";
import { View, StyleSheet } from "react-native";
import OrderItem from "@/components/pages/orders/OrderItem";
import { spacing } from "@/lib/theme";

type OrderListProps = { orders: Order[] };

const OrderList: React.FC<OrderListProps> = ({ orders }) => (
  <View style={styles.list}>
    {orders.map((o) => (
      <OrderItem key={o.id} order={o} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: { marginTop: spacing.gap[8] },
});

export default OrderList;
