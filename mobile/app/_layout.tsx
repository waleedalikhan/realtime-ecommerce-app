import { Stack } from "expo-router";
import { Providers } from "@/providers";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </Providers>
  );
}
