import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

export const homeBannerStyles = StyleSheet.create({
  section: {
    paddingTop: spacing.gap[8],
    paddingBottom: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    alignItems: "center",
  },
  eyebrow: {
    ...typography.sm,
    ...typography.fontMedium,
    letterSpacing: 2,
    color: "rgba(251,191,36,0.9)",
    marginBottom: spacing.gap[4],
    textTransform: "uppercase",
  },
  title: {
    ...typography["4xl"],
    ...typography.fontBold,
    color: colors.white,
    textAlign: "center",
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  titleHighlight: { color: colors.amber[400] },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.lg,
    color: colors.stone[400],
    textAlign: "center",
    maxWidth: 672,
  },
  actions: {
    marginTop: spacing.gap[10],
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.gap[4],
  },
});

export const homeFeaturesStyles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.5)",
    backgroundColor: "rgba(12,10,9,0.5)",
    paddingVertical: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  heading: {
    ...typography.sm,
    ...typography.fontMedium,
    letterSpacing: 2,
    color: colors.stone[500],
    textAlign: "center",
    textTransform: "uppercase",
  },
  grid: {
    marginTop: spacing.gap[8],
    gap: spacing.gap[8],
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[2],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: "rgba(245,158,11,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.gap[4],
  },
  cardTitle: {
    ...typography.lg,
    ...typography.fontSemibold,
    color: colors.white,
  },
  cardDesc: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
  },
});
