import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Toast from "react-native-toast-message";

export default function useProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const token = useSelector((s: RootState) => s.auth.token);
  const productId = id ?? "";

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: () => api<Product>(`/products/${productId}`),
    enabled: !!productId,
  });

  async function addToCart() {
    if (!token) {
      router.replace("/login");
      return;
    }
    try {
      await api(`/cart/items`, {
        method: "POST",
        token,
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      Toast.show({
        type: "success",
        text1: "Item added to cart",
      });
    } catch (_e) {
      // Toast in polish step
      Toast.show({
        type: "error",
        text1: "Error adding to cart",
        text2: (_e as Error).message,
      });
    }
  }

  const productImageUrl = (p: Product): string => {
    if (p.imageUrl) return p.imageUrl;
    return `https://picsum.photos/seed/${encodeURIComponent(p.id)}/800/600`;
  };

  return { product, isLoading, error, addToCart, productImageUrl };
}
