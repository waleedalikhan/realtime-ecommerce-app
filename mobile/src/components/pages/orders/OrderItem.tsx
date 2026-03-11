import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { orderItemStyles as styles } from "@/styles/Orders.styles";

type Props = { order: Order };

const OrderItem: React.FC<Props> = ({ order }) => (
  <Link href={("/orders/" + order.id) as any} asChild>
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
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

export default OrderItem;
