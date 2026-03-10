import { ScrollView } from "react-native";
import Product from "@/components/pages/products/product";

export default function ProductDetailScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Product />
    </ScrollView>
  );
}
