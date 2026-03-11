import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/global/ui/Button";
import { homeBannerStyles as styles } from "@/styles/Home.styles";

const Banner: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>Live inventory · Instant updates</Text>
        <Text style={styles.title}>
          Commerce that moves at{" "}
          <Text style={styles.titleHighlight}>the speed of now</Text>
        </Text>
        <Text style={styles.subtitle}>
          Checkout, track orders, and stay in sync—all in real time. No refresh,
          no guessing. Just what you need, when you need it.
        </Text>
        <View style={styles.actions}>
          <Button onPress={() => router.push("/products")}>
            Shop products
          </Button>
          <Button variant="outline" onPress={() => router.push("/register")}>
            Create account
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Banner;
