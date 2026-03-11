import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { colors } from "@/lib/theme";

export default function MobileLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 48,
  },
});
