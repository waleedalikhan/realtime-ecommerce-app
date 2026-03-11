import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.stone[600],
    backgroundColor: "rgba(41,37,36,0.6)",
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[2],
    paddingVertical: spacing.gap[2],
    minHeight: 44,
    minWidth: 120,
  },
  triggerText: {
    ...typography.base,
    color: colors.white,
  },
  chevron: {
    fontSize: 10,
    color: colors.stone[400],
  },
  pressed: { opacity: 0.8 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: spacing.px,
  },
  dropdown: {
    backgroundColor: colors.stone[800],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone[700],
    maxHeight: 300,
  },
  option: {
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.gap[2],
  },
  optionSelected: { backgroundColor: "rgba(251,191,36,0.15)" },
  optionText: {
    ...typography.base,
    color: colors.white,
  },
  optionTextSelected: { color: colors.amber[400] },
});

export default styles;
