import { ScrollView } from "react-native";
import Home from "@/components/pages/home";

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Home />
    </ScrollView>
  );
}
