import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const styles = StyleSheet.create({
  wrap: {
    maxWidth: 448,
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
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
  },
  form: { marginTop: spacing.gap[2] },
  rootError: {
    ...typography.sm,
    color: colors.red[400],
    marginBottom: spacing.gap[2],
  },
  pressed: { opacity: 0.9 },
});

export default styles;
