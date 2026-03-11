import { colors, spacing, typography } from "@/lib/theme";
import { Platform, StyleSheet } from "react-native";

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
    gap: spacing.gap[2],
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

export default styles;
