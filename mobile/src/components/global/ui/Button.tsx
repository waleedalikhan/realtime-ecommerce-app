import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  size = "md",
  variant = "primary",
  style,
  textStyle,
}) => {
  const sizeStyle = size === "sm" ? styles.sm : styles.md;
  const variantStyle =
    variant === "primary"
      ? styles.primary
      : variant === "outline"
        ? styles.outline
        : styles.secondary;
  const textVariantStyle =
    variant === "primary" ? styles.textPrimary : styles.textLight;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        variantStyle,
        pressed && styles.pressed,
        disabled && styles.disabled,
        Array.isArray(style) ? style : style,
      ]}
    >
      <Text style={[styles.text, textVariantStyle, textStyle]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.gap[2],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.px,
  },
  sm: { paddingVertical: spacing.py.sm },
  md: { paddingVertical: spacing.py.md },
  primary: {
    backgroundColor: colors.amber[500],
    shadowColor: "rgba(251,191,36,0.3)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },
  outline: {
    backgroundColor: "rgba(41,37,36,0.4)",
    borderWidth: 1,
    borderColor: colors.stone[600],
  },
  secondary: {
    backgroundColor: colors.stone[800],
  },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.5 },
  text: {
    ...typography.base,
    ...typography.fontSemibold,
  },
  textPrimary: { color: colors.background },
  textLight: { color: colors.white },
});

export default Button;
