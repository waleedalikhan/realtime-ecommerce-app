import { ScrollView } from "react-native";
import LoginForm from "@/components/pages/auth/LoginForm";

export default function LoginScreen() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <LoginForm />
    </ScrollView>
  );
}
