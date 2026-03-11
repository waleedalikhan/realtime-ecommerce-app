import React from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";
import AuthWall from "@/components/global/AuthWall";
import { orderStyles as styles } from "@/styles/Orders.styles";

const Order: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const token = useSelector((s: RootState) => s.auth.token);
  const router = useRouter();
  const orderId = id ?? "";

  useOrderUpdates(token);

  const { data: order, isLoading } = useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: () => api<Order>(`/orders/${orderId}`, { token: token ?? null }),
    enabled: !!token && !!orderId,
  });

  if (!token) return <AuthWall message="Please log in to view this order." />;
  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.loading}>Loading order...</Text>
      </View>
    );
  }
  if (!order) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.loading}>Order not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Back to orders</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backLink}>← Back to orders</Text>
      </Pressable>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Order {order.id.slice(0, 8)}...</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{order.status}</Text>
          </View>
        </View>
        <Text style={styles.live}>Live updates when status changes.</Text>
        <View style={styles.dl}>
          <View style={styles.dlRow}>
            <Text style={styles.dt}>Shipping address</Text>
            <Text style={styles.dd}>{order.shippingAddress}</Text>
          </View>
          <View style={styles.dlRow}>
            <Text style={styles.dt}>Contact email</Text>
            <Text style={styles.dd}>{order.contactEmail}</Text>
          </View>
        </View>
        <Text style={styles.itemsTitle}>Items</Text>
        <View style={styles.items}>
          {order.items.map((item, i) => (
            <Text key={i} style={styles.itemText}>
              {item.product.name} × {item.quantity}
              {item.priceAt != null ? ` · $${item.priceAt}` : ""}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Order;
