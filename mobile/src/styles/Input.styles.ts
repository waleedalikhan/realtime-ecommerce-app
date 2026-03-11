import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing, typography } from "@/lib/theme";

const styles = StyleSheet.create({
  container: { marginBottom: spacing.gap[4] },
  label: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
    marginBottom: spacing.gap[1],
  },
  input: {
    ...typography.base,
    color: colors.white,
    backgroundColor: colors.stone[800],
    borderWidth: 1,
    borderColor: colors.stone[700],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
  },
  inputError: { borderColor: colors.red[400] },
  errorText: {
    ...typography.sm,
    color: colors.red[400],
    marginTop: spacing.gap[1],
  },
});

export default styles;
