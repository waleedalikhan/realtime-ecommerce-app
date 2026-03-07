import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/api/client";

type Product = { id: string; name: string; price: number; category: string };
type Res = { data: Product[]; total: number };

export default function ProductsScreen() {
  const router = useRouter();
  const [data, setData] = useState<Res | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<Res>("/products?limit=20")
      .then(setData)
      .catch(() => setData({ data: [], total: 0 }))
      .finally(() => setLoading(false));
  }, []);
  if (loading)
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push("/product/" + item.id)}
          style={{
            padding: 12,
            borderWidth: 1,
            marginBottom: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ color: "#666" }}>${item.price}</Text>
        </Pressable>
      )}
    />
  );
}
