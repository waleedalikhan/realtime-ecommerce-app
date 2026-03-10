import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/global/ui/Button";
import { colors, spacing, typography } from "@/lib/theme";

const CTAStrip: React.FC = () => {
  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <Text style={styles.title}>Ready to shop in real time?</Text>
        <Text style={styles.subtitle}>
          Create an account or browse products—no commitment required.
        </Text>
        <View style={styles.actions}>
          <Link href="/products" asChild>
            <Pressable>
              <Button variant="secondary">Browse products</Button>
            </Pressable>
          </Link>
          <Link href="/register" asChild>
            <Pressable>
              <Button variant="primary">Get started</Button>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.5)",
    paddingVertical: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    alignItems: "center",
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
    textAlign: "center",
  },
  actions: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.gap[4],
  },
});

export default CTAStrip;
