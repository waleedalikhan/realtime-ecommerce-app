import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/api/client";

type Order = { id: string; status: string; createdAt: string };

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Order[]>("/orders")
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  if (!orders.length)
    return (
      <View style={{ padding: 20 }}>
        <Text>No orders yet.</Text>
      </View>
    );
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({ pathname: "/orders/[id]", params: { id: item.id } })
          }
          style={{
            padding: 12,
            borderWidth: 1,
            marginBottom: 8,
            borderRadius: 6,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#2563eb" }}>{item.id.slice(0, 8)}...</Text>
          <Text>{item.status}</Text>
        </Pressable>
      )}
    />
  );
}
