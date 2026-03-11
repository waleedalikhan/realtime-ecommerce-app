import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.6)",
    backgroundColor: "rgba(12,10,9,0.95)",
    paddingTop: 12,
    paddingBottom: spacing.gap[1],
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: spacing.px,
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
  },
  tab: {
    gap: spacing.gap[1],
  },
  tabActive: {
    backgroundColor: "rgba(41,37,36,0.9)",
    paddingHorizontal: spacing.gap[2],
    paddingVertical: spacing.gap[1],
    borderRadius: 999,
  },
  icon: {
    marginBottom: 4,
    marginHorizontal: "auto",
  },
  iconActive: {
    color: colors.amber[400],
  },
  label: {
    ...typography.xs,
    ...typography.fontMedium,
    color: colors.stone[500],
  },
  labelActive: {
    color: colors.amber[400],
  },
  pressed: {
    opacity: 0.8,
  },
});

export default styles;
