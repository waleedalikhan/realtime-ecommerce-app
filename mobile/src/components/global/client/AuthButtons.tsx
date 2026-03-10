import React, { useLayoutEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter, Link } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { setAuth, clearAuth } from "@/store/authSlice";
import { getStoredToken, clearStoredTokens } from "@/store/authStorage";
import { colors, spacing, typography } from "@/lib/theme";

const AuthButtons: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useLayoutEffect(() => {
    let cancelled = false;
    const hydrate = async () => {
      const access = await getStoredToken("accessToken");
      const refresh = await getStoredToken("refreshToken");
      const token = access ?? refresh;
      if (!cancelled && token) {
        dispatch(setAuth({ token, refreshToken: token, user: null }));
      }
    };
    hydrate();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const handleLogout = async () => {
    await clearStoredTokens();
    dispatch(clearAuth());
    router.replace("/");
  };

  if (isLoggedIn) {
    return (
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [styles.navBtn, pressed && styles.pressed]}
      >
        <Text style={styles.navBtnText}>Log out</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Link href="/login" asChild>
        <Pressable style={({ pressed }) => [styles.navBtn, pressed && styles.pressed]}>
          <Text style={styles.navBtnText}>Log in</Text>
        </Pressable>
      </Link>
      <View style={styles.divider} />
      <Link href="/register" asChild>
        <Pressable style={({ pressed }) => [styles.signUpBtn, pressed && styles.pressed]}>
          <Text style={styles.signUpText}>Sign up</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center", gap: spacing.gap[1] },
  navBtn: {
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.gap[2],
    borderRadius: 8,
  },
  signUpBtn: {
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.gap[2],
    borderRadius: 8,
    backgroundColor: colors.amber[500],
  },
  pressed: { opacity: 0.8 },
  navBtnText: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[400],
  },
  signUpText: {
    ...typography.sm,
    ...typography.fontSemibold,
    color: colors.background,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: colors.stone[700],
  },
});

export default AuthButtons;
