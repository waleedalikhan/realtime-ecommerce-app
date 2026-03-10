import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const OrderEmpty: React.FC = () => (
  <View style={styles.card}>
    <Text style={styles.text}>No orders yet.</Text>
    <Link href="/products" asChild>
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Shop products</Text>
      </Pressable>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.gap[8],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
    alignItems: "center",
  },
  text: { fontSize: 16, color: colors.stone[400] },
  btn: {
    marginTop: spacing.gap[4],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.amber[500],
    paddingHorizontal: spacing.px,
    paddingVertical: spacing.py.sm,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.background,
  },
});

export default OrderEmpty;
