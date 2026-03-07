import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/api/client";
import { useAuth } from "@/context/AuthContext";
import { useOrderUpdates } from "@/hooks/useOrderUpdates";

type Order = { id: string; status: string; shippingAddress: string; contactEmail: string; items: { quantity: number; product: { name: string }; priceAt: number }[] };

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);

  useOrderUpdates(token, (payload) => {
    if (payload.orderId === id) {
      setOrder((o) => (o ? { ...o, status: payload.status } : null));
    }
  });

  useEffect(() => {
    if (!id) return;
    api<Order>("/orders/" + id).then(setOrder).catch(() => setOrder(null));
  }, [id]);

  if (!order) return <View style={{ padding: 20 }}><Text>Loading or not found</Text></View>;
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Order {order.id.slice(0, 8)}...</Text>
      <Text style={{ fontSize: 16, marginTop: 8 }}>Status: {order.status}</Text>
      <Text style={{ color: "#666", marginTop: 4 }}>Live updates via Socket when status changes.</Text>
      <Text style={{ marginTop: 12 }}>Shipping: {order.shippingAddress}</Text>
      <Text style={{ marginTop: 4 }}>Contact: {order.contactEmail}</Text>
      <View style={{ marginTop: 12 }}>
        {order.items.map((item, i) => (
          <Text key={i}>{item.product.name} x {item.quantity}</Text>
        ))}
      </View>
    </View>
  );
}
