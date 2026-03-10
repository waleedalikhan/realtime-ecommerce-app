import { ScrollView } from "react-native";
import ProductsWithSuspense from "@/components/pages/products/ProductsWithSuspense";

export default function ProductsScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <ProductsWithSuspense />
    </ScrollView>
  );
}
