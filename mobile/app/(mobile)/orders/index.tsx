import { ScrollView } from "react-native";
import Orders from "@/components/pages/orders";

export default function OrdersScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Orders />
    </ScrollView>
  );
}
