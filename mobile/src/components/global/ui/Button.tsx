import React, { forwardRef } from "react";
import { Pressable, Text, View, ViewStyle, TextStyle } from "react-native";
import styles from "@/styles/Button.styles";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  size?: "xs" | "sm" | "md";
  variant?: "primary" | "secondary" | "outline";
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
};

const Button = forwardRef<View, Props>(function Button(
  {
    children,
    onPress,
    disabled = false,
    size = "md",
    variant = "primary",
    style,
    textStyle,
  },
  ref
) {
  const sizeStyle =
    size === "xs" ? styles.xs : size === "sm" ? styles.sm : styles.md;
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
      ref={ref}
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
});

export default Button;
