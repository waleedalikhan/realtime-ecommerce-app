import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/api/client";

type CartItem = { id: string; quantity: number; product: { id: string; name: string; price: number } };
type Cart = { id: string; items: CartItem[] };

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const load = () => {
    api<Cart>("/cart").then(setCart).catch(() => setCart({ id: "", items: [] })).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);
  async function remove(itemId: string) {
    try {
      await api(`/cart/items/${itemId}`, { method: "DELETE" });
      load();
    } catch (_) { }
  }
  if (loading) return <View style={{ padding: 20 }}><Text>Loading...</Text></View>;
  if (!cart?.items.length) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Cart is empty.</Text>
        <Pressable onPress={() => router.push("/(tabs)")} style={{ marginTop: 12 }}><Text style={{ color: "#2563eb" }}>Browse products</Text></Pressable>
      </View>
    );
  }
  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 12, borderWidth: 1, marginBottom: 8, borderRadius: 6 }}>
            <Text>{item.product.name} x {item.quantity}</Text>
            <Pressable onPress={() => remove(item.id)}><Text style={{ color: "red" }}>Remove</Text></Pressable>
          </View>
        )}
      />
      <Pressable onPress={() => router.push("/checkout")} style={{ marginTop: 16, backgroundColor: "#2563eb", padding: 12, borderRadius: 6 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Checkout</Text>
      </Pressable>
    </View>
  );
}
