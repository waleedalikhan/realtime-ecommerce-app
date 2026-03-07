import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "@/api/client";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    api<Product>("/products/" + id)
      .then(setProduct)
      .catch(() => setProduct(null));
  }, [id]);

  async function addToCart() {
    if (!id) return;
    try {
      await api("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      router.push("/(tabs)/cart");
    } catch (_) {}
  }

  if (!product)
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading or not found</Text>
      </View>
    );
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{product.name}</Text>
      <Text style={{ color: "#666", marginTop: 8 }}>
        {product.description ?? ""}
      </Text>
      <Text style={{ marginTop: 8 }}>
        ${product.price} - {product.category}
      </Text>
      <Pressable
        onPress={addToCart}
        style={{
          marginTop: 16,
          backgroundColor: "#2563eb",
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Add to cart</Text>
      </Pressable>
    </View>
  );
}
