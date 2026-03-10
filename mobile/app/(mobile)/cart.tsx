import { ScrollView } from "react-native";
import Cart from "@/components/pages/cart";

export default function CartScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Cart />
    </ScrollView>
  );
}
