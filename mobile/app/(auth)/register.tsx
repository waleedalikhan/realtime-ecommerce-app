import { ScrollView } from "react-native";
import RegisterForm from "@/components/pages/auth/RegisterForm";

export default function RegisterScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <RegisterForm />
    </ScrollView>
  );
}
