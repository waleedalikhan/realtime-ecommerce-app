import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconLI, IconOT, IconSC } from "@/components/icons";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const features = [
  {
    icon: <IconLI />,
    title: "Live inventory",
    description:
      "Stock levels update instantly. No stale carts or surprise sold-outs.",
  },
  {
    icon: <IconOT />,
    title: "Order tracking",
    description:
      "Follow your order from payment to delivery with live status updates.",
  },
  {
    icon: <IconSC />,
    title: "Secure checkout",
    description:
      "Pay with confidence. Your data is protected every step of the way.",
  },
];

const Features: React.FC = () => (
  <View style={styles.section}>
    <View style={styles.inner}>
      <Text style={styles.heading}>Why Realtime</Text>
      <View style={styles.grid}>
        {features.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={styles.iconWrap}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.5)",
    backgroundColor: "rgba(12,10,9,0.5)",
    paddingVertical: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  heading: {
    ...typography.sm,
    ...typography.fontMedium,
    letterSpacing: 2,
    color: colors.stone[500],
    textAlign: "center",
    textTransform: "uppercase",
  },
  grid: {
    marginTop: spacing.gap[8],
    gap: spacing.gap[8],
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[2],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: "rgba(245,158,11,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.gap[4],
  },
  cardTitle: {
    ...typography.lg,
    ...typography.fontSemibold,
    color: colors.white,
  },
  cardDesc: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
  },
});

export default Features;
