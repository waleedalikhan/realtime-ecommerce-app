import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { colors } from "@/lib/theme";
import styles from "@/styles/Footer.styles";

const TABS = [
  { href: "/products", label: "Products", icon: "box" as const },
  { href: "/cart", label: "Cart", icon: "shopping-cart" as const },
  { href: "/orders", label: "Orders", icon: "file-text" as const },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        { paddingBottom: Math.max(insets.bottom, styles.footer.paddingBottom) },
      ]}
    >
      <View style={styles.inner}>
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href as any} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.tab,
                  active && styles.tabActive,
                  pressed && styles.pressed,
                ]}
              >
                <Feather
                  name={tab.icon}
                  size={20}
                  color={active ? colors.amber[400] : colors.stone[600]}
                  style={styles.icon}
                  width={20}
                  height={20}
                />
                <Text style={[styles.label, active && styles.labelActive]}>
                  {tab.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
};

export default Footer;
