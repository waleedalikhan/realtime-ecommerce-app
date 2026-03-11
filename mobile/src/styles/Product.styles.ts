import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

export const productStyles = StyleSheet.create({
  wrap: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  backLink: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  article: {
    marginTop: spacing.gap[2],
    overflow: "hidden",
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
  },
  grid: {
    flexDirection: "column",
  },
});

export const productDetailsStyles = StyleSheet.create({
  wrap: {
    padding: spacing.gap[8],
    justifyContent: "center",
  },
  category: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: "rgba(251,191,36,0.9)",
    textTransform: "uppercase",
  },
  name: {
    marginTop: spacing.gap[2],
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  description: {
    marginTop: spacing.gap[4],
    fontSize: 16,
    color: colors.stone[400],
    lineHeight: 24,
  },
  priceRow: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: spacing.gap[2],
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
  },
  stock: {
    fontSize: 14,
    color: colors.stone[500],
  },
  actions: { marginTop: spacing.gap[8] },
});

export const productImageStyles = StyleSheet.create({
  wrap: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
});

export const productPageStatesStyles = StyleSheet.create({
  wrap: {
    maxWidth: 1024,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  skeleton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
    flexDirection: "row",
  },
  skeletonImage: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: colors.stone[800],
  },
  skeletonContent: { flex: 1, padding: spacing.gap[8] },
  skeletonLine: {
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
    marginTop: spacing.gap[4],
  },
  skeletonBtn: {
    marginTop: spacing.gap[2],
    height: 40,
    width: 96,
    borderRadius: 8,
    backgroundColor: colors.stone[700],
  },
  errorText: { color: colors.red[400] },
  backBtn: { marginTop: spacing.gap[4] },
  backText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.amber[400],
  },
});
