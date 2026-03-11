import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
    alignItems: "center",
  },
  message: {
    ...typography.base,
    color: colors.stone[400],
    textAlign: "center",
    marginBottom: 16,
  },
  btn: {
    marginTop: spacing.gap[4],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.amber[500],
    paddingHorizontal: spacing.px,
    paddingVertical: spacing.py.sm,
  },
  pressed: { opacity: 0.9 },
  btnText: {
    ...typography.base,
    ...typography.fontSemibold,
    color: colors.background,
  },
});

export default styles;
