import React from "react";
import { View, Text, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { Link, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthButtons from "@/components/global/client/AuthButtons";
import MobileMenu from "@/components/global/MobileMenu";
import { NAV_LINKS } from "@/constants";
import { colors, spacing, typography } from "@/lib/theme";

const Header: React.FC = () => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Link href="/" asChild>
          <Text style={styles.logo}>Realtime Commerce</Text>
        </Link>
        <View style={styles.nav}>
          {isDesktop && (
            <>
              <View style={styles.desktopNav}>
                {NAV_LINKS.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link key={link.href} href={link.href as any} asChild>
                      <Text
                        style={[
                          styles.navLink,
                          isActive && styles.navLinkActive,
                        ]}
                      >
                        {link.label}
                      </Text>
                    </Link>
                  );
                })}
              </View>
              <View style={styles.divider} />
              <View style={styles.authWrap}>
                <AuthButtons />
              </View>
            </>
          )}
          <MobileMenu />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(41,37,36,0.5)",
    backgroundColor: "rgba(12,12,15,0.8)",
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    }),
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    paddingHorizontal: spacing.px,
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
  },
  logo: {
    ...typography.sm,
    ...typography.fontSemibold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[1],
  },
  desktopNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[1],
  },
  navLink: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.gap[2],
    borderRadius: 8,
  },
  navLinkActive: { color: colors.white },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: colors.stone[700],
  },
  authWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[2],
  },
});

export default Header;
