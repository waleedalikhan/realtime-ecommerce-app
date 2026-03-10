import { ScrollView } from "react-native";
import Order from "@/components/pages/orders/order";

export default function OrderDetailScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Order />
    </ScrollView>
  );
}
