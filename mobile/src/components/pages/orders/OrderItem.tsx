import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

type OrderItemProps = { order: Order };

const OrderItem: React.FC<OrderItemProps> = ({ order }) => (
  <Link href={"/orders/" + order.id as any} asChild>
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <Text style={styles.id}>{order.id.slice(0, 8)}...</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{order.status}</Text>
        </View>
      </View>
      {order.createdAt ? (
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      ) : null}
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[4],
    marginBottom: spacing.gap[4],
  },
  pressed: { opacity: 0.95 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  id: {
    fontSize: 14,
    color: colors.stone[300],
  },
  badge: {
    borderRadius: 9999,
    backgroundColor: "rgba(68,64,60,0.8)",
    paddingHorizontal: spacing.gap[2],
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.stone[300],
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: colors.stone[500],
  },
});

export default OrderItem;
