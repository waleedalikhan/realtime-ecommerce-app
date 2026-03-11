import { StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

export const cartListStyles = StyleSheet.create({
  list: { marginTop: spacing.gap[8] },
});

export const cartStyles = StyleSheet.create({
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

export const cartListItemStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[4],
    marginBottom: spacing.gap[4],
  },
  info: {},
  name: { ...typography.fontMedium, color: colors.white },
  price: { ...typography.sm, color: colors.stone[500] },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.gap[2] },
  qtyWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.gap[1],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.stone[600],
    backgroundColor: "rgba(41,37,36,0.4)",
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
  },
  qtyValue: {
    minWidth: 24,
    textAlign: "center",
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
  },
  disabled: { opacity: 0.5 },
  removeBtn: { paddingHorizontal: spacing.gap[2], paddingVertical: 6 },
  pressed: { opacity: 0.8 },
  removeText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.red[400],
  },
});

export const cartActionsStyles = StyleSheet.create({
  wrap: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    gap: spacing.gap[4],
  },
});

export const cartEmptyStyles = StyleSheet.create({
  card: {
    marginTop: spacing.gap[8],
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
    alignItems: "center",
  },
  text: { ...typography.base, color: colors.stone[400] },
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
