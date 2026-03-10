import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { colors, spacing, typography } from "@/lib/theme";

const FOOTER_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Sign up" },
];

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <Text style={styles.brand}>Realtime Commerce</Text>
        <View style={styles.nav}>
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href as any} asChild>
              <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
                <Text style={styles.linkText}>{link.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.5)",
    backgroundColor: "rgba(12,10,9,0.8)",
    paddingVertical: spacing.gap[10],
  },
  inner: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.px,
    gap: spacing.gap[6],
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
  },
  brand: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[500],
  },
  nav: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.gap[6],
  },
  linkText: {
    ...typography.sm,
    color: colors.stone[500],
  },
  pressed: { opacity: 0.7 },
});

export default Footer;
