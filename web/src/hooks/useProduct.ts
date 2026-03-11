import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { openDrawer } from "@/store/cartUiSlice";

const useProduct = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = useSelector((s: RootState) => s.auth.token);
  const id = params.id as string;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => api<Product>(`/products/${id}`),
  });

  async function addToCart() {
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await api(`/cart/items`, {
        method: "POST",
        token,
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.cart() });
      dispatch(openDrawer());
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  const productImageUrl = (p: Product): string => {
    if (p.imageUrl) return p.imageUrl;
    return `https://picsum.photos/seed/${encodeURIComponent(p.id)}/800/600`;
  };

  return { product, isLoading, error, addToCart, productImageUrl };
};

export default useProduct;
