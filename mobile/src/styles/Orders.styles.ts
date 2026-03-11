import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

export const orderEmptyStyles = StyleSheet.create({
  card: {
    marginTop: spacing.gap[8],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
    alignItems: "center",
  },
  text: { fontSize: 16, color: colors.stone[400] },
  btn: {
    marginTop: spacing.gap[4],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.amber[500],
    paddingHorizontal: spacing.px,
    paddingVertical: spacing.py.sm,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.background,
  },
});

export const orderItemStyles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[4],
    marginBottom: spacing.gap[4],
  },
  pressed: { opacity: 0.95 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  id: {
    fontSize: 14,
    color: colors.stone[300],
  },
  badge: {
    borderRadius: 9999,
    backgroundColor: "rgba(68,64,60,0.8)",
    paddingHorizontal: spacing.gap[2],
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.stone[300],
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: colors.stone[500],
  },
});

export const orderListStyles = StyleSheet.create({
  list: { marginTop: spacing.gap[8] },
});

export const ordersStyles = StyleSheet.create({
  wrap: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  loading: { fontSize: 16, color: colors.stone[400] },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: colors.stone[400],
  },
});

export const orderStyles = StyleSheet.create({
  wrap: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  loading: { ...typography.base, color: colors.stone[400] },
  backBtn: { marginBottom: spacing.gap[2] },
  backLink: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  backText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  card: {
    marginTop: spacing.gap[2],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  badge: {
    borderRadius: 9999,
    backgroundColor: "rgba(245,158,11,0.2)",
    paddingHorizontal: spacing.gap[2],
    paddingVertical: 4,
  },
  badgeText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.amber[400],
  },
  live: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: colors.stone[500],
  },
  dl: { marginTop: spacing.gap[2] },
  dlRow: { marginBottom: spacing.gap[2] },
  dt: { ...typography.sm, color: colors.stone[500] },
  dd: { ...typography.sm, color: colors.stone[300] },
  itemsTitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    ...typography.fontSemibold,
    color: colors.white,
  },
  items: { marginTop: spacing.gap[2] },
  itemText: {
    ...typography.sm,
    color: colors.stone[400],
    marginBottom: 4,
  },
});
