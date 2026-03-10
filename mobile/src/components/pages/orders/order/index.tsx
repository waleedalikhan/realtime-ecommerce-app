import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";
import AuthWall from "@/components/global/AuthWall";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const Order: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const token = useSelector((s: RootState) => s.auth.token);
  const router = useRouter();
  const orderId = id ?? "";

  useOrderUpdates(token);

  const { data: order, isLoading } = useQuery({
    queryKey: queryKeys.order(orderId),
    queryFn: () => api<Order>(`/orders/${orderId}`, { token: token ?? undefined }),
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
          <Text style={styles.title}>
            Order {order.id.slice(0, 8)}...
          </Text>
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

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  loading: { ...typography.base, color: colors.stone[400] },
  backBtn: { marginBottom: spacing.gap[2] },
  backLink: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  backText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  card: {
    marginTop: spacing.gap[2],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  badge: {
    borderRadius: 9999,
    backgroundColor: "rgba(245,158,11,0.2)",
    paddingHorizontal: spacing.gap[2],
    paddingVertical: 4,
  },
  badgeText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  live: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: colors.stone[500],
  },
  dl: { marginTop: spacing.gap[2] },
  dlRow: { marginBottom: spacing.gap[2] },
  dt: { ...typography.sm, color: colors.stone[500] },
  dd: { ...typography.sm, color: colors.stone[300] },
  itemsTitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    ...typography.fontSemibold,
    color: colors.white,
  },
  items: { marginTop: spacing.gap[2] },
  itemText: {
    ...typography.sm,
    color: colors.stone[400],
    marginBottom: 4,
  },
});

export default Order;
