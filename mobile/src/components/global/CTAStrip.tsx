import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/global/ui/Button";
import styles from "@/styles/CTAStrip.styles";

const CTAStrip: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <Text style={styles.title}>Ready to shop in real time?</Text>
        <Text style={styles.subtitle}>
          Create an account or browse products—no commitment required.
        </Text>
        <View style={styles.actions}>
          <Button variant="secondary" onPress={() => router.push("/products")}>
            Browse products
          </Button>
          <Button onPress={() => router.push("/register")}>Get started</Button>
        </View>
      </View>
    </View>
  );
};

export default CTAStrip;
