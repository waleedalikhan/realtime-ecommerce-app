import { ScrollView } from "react-native";
import Checkout from "@/components/pages/checkout";

export default function CheckoutScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Checkout />
    </ScrollView>
  );
}
