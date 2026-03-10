/**
 * Design tokens matching web (Tailwind stone/amber palette).
 * Use for StyleSheet.create() or pass as style props.
 */
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const MAX_CONTENT_WIDTH = Math.min(1152, SCREEN_WIDTH);

export const colors = {
  background: "#0c0c0f",
  stone: {
    100: "#f5f5f4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
  amber: {
    400: "#fbbf24",
    500: "#f59e0b",
  },
  red: {
    400: "#f87171",
  },
  white: "#ffffff",
  black: "#000000",
} as const;

export const spacing = {
  px: 24, // px-6
  py: {
    sm: 10,
    md: 14,
    lg: 16,
    xl: 20,
    "2xl": 24,
  },
  gap: {
    1: 4,
    2: 8,
    4: 16,
  6: 24,
  8: 32,
  10: 40,
  },
} as const;

export const borderRadius = {
  lg: 12,  // rounded-xl
  xl: 16,  // rounded-2xl
} as const;

export const typography = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  base: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 24 },
  "3xl": { fontSize: 30 },
  "4xl": { fontSize: 36 },
  fontMedium: { fontWeight: "500" as const },
  fontSemibold: { fontWeight: "600" as const },
  fontBold: { fontWeight: "700" as const },
} as const;
