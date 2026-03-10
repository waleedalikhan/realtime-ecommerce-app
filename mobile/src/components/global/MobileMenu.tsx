import React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { IconHamburger, IconX } from "@/components/icons";
import useMenu from "@/hooks/useMenu";
import { NAV_LINKS } from "@/constants";
import AuthButtons from "@/components/global/client/AuthButtons";
import { colors, spacing, typography } from "@/lib/theme";

const MobileMenu: React.FC = () => {
  const { isOpen, toggle } = useMenu();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!isMobile) return null;

  return (
    <>
      <Pressable onPress={toggle} style={styles.trigger} hitSlop={8}>
        <IconHamburger />
      </Pressable>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={toggle}
      >
        <Pressable style={styles.overlay} onPress={toggle}>
          <View style={styles.panel}>
            <Pressable
              style={styles.closeBtn}
              onPress={toggle}
              hitSlop={8}
            >
              <IconX />
            </Pressable>
            <View style={styles.links}>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href as any} asChild>
                  <Pressable onPress={toggle} style={styles.menuLink}>
                    <Text style={styles.menuLinkText}>{link.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View style={styles.authRow}>
              <AuthButtons />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: { padding: spacing.gap[2] },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 24,
    padding: spacing.gap[2],
  },
  links: {
    alignItems: "center",
    gap: spacing.gap[2],
  },
  menuLink: { paddingVertical: spacing.gap[2] },
  menuLinkText: {
    ...typography["3xl"],
    ...typography.fontMedium,
    color: colors.white,
  },
  authRow: { marginTop: spacing.gap[10], flexDirection: "row", gap: spacing.gap[2] },
});

export default MobileMenu;
