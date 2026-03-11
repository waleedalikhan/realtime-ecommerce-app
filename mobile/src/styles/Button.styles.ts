import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.gap[2],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.px,
  },
  xs: { paddingVertical: spacing.py.sm, paddingHorizontal: 16 },
  sm: { paddingVertical: spacing.py.sm },
  md: { paddingVertical: spacing.py.md },
  primary: {
    backgroundColor: colors.amber[500],
    shadowColor: "rgba(251,191,36,0.3)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },
  outline: {
    backgroundColor: "rgba(41,37,36,0.4)",
    borderWidth: 1,
    borderColor: colors.stone[600],
  },
  secondary: {
    backgroundColor: colors.stone[800],
  },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.5 },
  text: {
    ...typography.base,
    ...typography.fontSemibold,
  },
  textPrimary: { color: colors.background },
  textLight: { color: colors.white },
});

export default styles;
