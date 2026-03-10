import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

type AuthWallProps = {
  message?: string;
};

const AuthWall: React.FC<AuthWallProps> = ({
  message = "Please log in to proceed.",
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.message}>{message}</Text>
        <Link href="/login" asChild>
          <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
            <Text style={styles.btnText}>Log in</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: spacing.px,
  },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(41,37,36,0.8)",
    backgroundColor: "rgba(28,25,23,0.4)",
    padding: spacing.gap[8],
    alignItems: "center",
  },
  message: {
    ...typography.base,
    color: colors.stone[400],
    textAlign: "center",
  },
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

export default AuthWall;
