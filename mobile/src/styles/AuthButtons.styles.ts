import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center", gap: spacing.gap[1] },
  logoutBtn: {
    borderRadius: 8,
  },
  loginBtn: {
    backgroundColor: "transparent",
  },
  signUpBtn: {
    backgroundColor: colors.amber[500],
  },
  pressed: { opacity: 0.8 },
  loginText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  logoutText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  signUpText: {
    ...typography.sm,
    ...typography.fontSemibold,
    color: colors.background,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: colors.stone[700],
  },
});

export default styles;
