import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useOrders from "@/hooks/useOrders";
import AuthWall from "@/components/global/AuthWall";
import OrderEmpty from "@/components/pages/orders/OrderEmpty";
import OrderList from "@/components/pages/orders/OrderList";
import { ordersStyles as styles } from "@/styles/Orders.styles";

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

export default Orders;
