import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 448,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    backgroundColor: colors.background,
    height: "100%",
    display: "flex",
    justifyContent: "center",
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
  footer: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: colors.stone[400],
    textAlign: "center",
  },
  link: {
    ...typography.fontMedium,
    color: colors.amber[400],
  },
});

export default styles;
