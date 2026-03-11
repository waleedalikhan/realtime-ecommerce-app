import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(41,37,36,0.5)",
    paddingVertical: spacing.gap[8],
  },
  inner: {
    maxWidth: 1152,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
    alignItems: "center",
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
    textAlign: "center",
  },
  actions: {
    marginTop: spacing.gap[8],
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.gap[4],
  },
});

export default styles;
