import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

export const productsStyles = StyleSheet.create({
  wrap: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    paddingBottom: spacing.gap[8],
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  subtitle: {
    marginTop: spacing.gap[1],
    ...typography.base,
    color: colors.stone[400],
  },
});

export const productCardStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
  },
  pressed: { opacity: 0.95 },
  imageWrap: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  outOfStock: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
  body: { paddingVertical: spacing.gap[4] },
  name: {
    ...typography.base,
    ...typography.fontSemibold,
    color: colors.white,
  },
  price: {
    marginTop: spacing.gap[1],
    ...typography.base,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  meta: {
    marginTop: spacing.gap[1],
    ...typography.sm,
    color: colors.stone[500],
  },
  metaStock: { color: colors.stone[400] },
});

export const productsFiltersStyles = StyleSheet.create({
  wrap: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.gap[2],
  },
  searchRow: {
    flexDirection: "row",
    width: "100%",
  },
  searchInput: {
    flex: 1,
    ...typography.base,
    color: colors.white,
    backgroundColor: "rgba(41,37,36,0.6)",
    borderWidth: 1,
    borderColor: colors.stone[600],
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
  },
  searchBtn: {
    backgroundColor: colors.stone[700],
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: colors.stone[600],
    borderTopRightRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
    justifyContent: "center",
  },
  pressed: { opacity: 0.8 },
  searchBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[2],
    width: "48%",
  },
  label: {
    ...typography.sm,
    color: colors.stone[400],
  },
});

export const productsGridStyles = StyleSheet.create({
  grid: {
    marginTop: spacing.gap[4],
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gap[2],
  },
  cardWrap: {
    flex: 1,
    minWidth: 140,
    maxWidth: 400,
  },
});

export const productsSummaryStyles = StyleSheet.create({
  text: {
    marginTop: spacing.gap[4],
    ...typography.sm,
    color: colors.stone[500],
  },
});

export const productsPaginationStyles = StyleSheet.create({
  nav: {
    marginTop: spacing.gap[2],
    paddingVertical: spacing.gap[2],
    paddingHorizontal: spacing.gap[4],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(68,64,60,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.gap[4],
  },
  summary: {
    ...typography.sm,
    color: colors.stone[500],
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[2],
  },
  buttons: { flexDirection: "row", gap: 4 },
  pageBtn: {
    minWidth: 36,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pageBtnDisabled: { opacity: 0.5 },
  pageBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  pageBtnTextDisabled: { color: colors.stone[600] },
});

export const productsPageStatesStyles = StyleSheet.create({
  loading: {
    paddingVertical: spacing.gap[8],
    paddingHorizontal: spacing.px,
  },
  skeletonTitle: {
    height: 32,
    width: 192,
    borderRadius: 4,
    backgroundColor: colors.stone[800],
  },
  skeletonGrid: {
    marginTop: spacing.gap[2],
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.gap[2],
  },
  skeletonCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    overflow: "hidden",
    width: "30%",
    minWidth: 140,
  },
  skeletonImage: {
    aspectRatio: 4 / 3,
    backgroundColor: colors.stone[800],
  },
  skeletonLine: {
    height: 20,
    margin: spacing.gap[2],
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
  skeletonLineNarrow: { width: "50%" },
  errorWrap: { paddingHorizontal: spacing.px },
  errorText: { color: colors.red[400] },
  pending: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: "rgba(251,191,36,0.8)",
  },
});

export const productsWithSuspenseStyles = StyleSheet.create({
  fallback: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    paddingBottom: spacing.gap[8],
  },
  skeletonTitle: {
    height: 32,
    width: 192,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
  skeletonSubtitle: {
    marginTop: spacing.gap[4],
    height: 16,
    width: 280,
    borderRadius: 4,
    backgroundColor: colors.stone[800],
  },
  skeletonFilters: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    gap: spacing.gap[4],
  },
  skeletonFilter: {
    height: 40,
    width: 96,
    borderRadius: 4,
    backgroundColor: colors.stone[700],
  },
});
