import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/global/ui/Button";
import { colors, spacing, typography } from "@/lib/theme";

const Banner: React.FC = () => {
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
          <Link href="/products" asChild>
            <Pressable>
              <Button>Shop products</Button>
            </Pressable>
          </Link>
          <Link href="/register" asChild>
            <Pressable>
              <Button variant="outline">Create account</Button>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: spacing.gap[8],
    paddingBottom: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    alignItems: "center",
  },
  eyebrow: {
    ...typography.sm,
    ...typography.fontMedium,
    letterSpacing: 2,
    color: "rgba(251,191,36,0.9)",
    marginBottom: spacing.gap[4],
    textTransform: "uppercase",
  },
  title: {
    ...typography["4xl"],
    ...typography.fontBold,
    color: colors.white,
    textAlign: "center",
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  titleHighlight: { color: colors.amber[400] },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.lg,
    color: colors.stone[400],
    textAlign: "center",
    maxWidth: 672,
  },
  actions: {
    marginTop: spacing.gap[10],
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.gap[4],
  },
});

export default Banner;
