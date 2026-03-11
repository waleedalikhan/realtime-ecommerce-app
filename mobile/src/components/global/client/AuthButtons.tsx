import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { setAuth, clearAuth } from "@/store/authSlice";
import { getStoredToken, clearStoredTokens } from "@/store/authStorage";
import Button from "@/components/global/ui/Button";
import styles from "@/styles/AuthButtons.styles";

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
      <Button
        onPress={handleLogout}
        size="sm"
        variant="outline"
        textStyle={styles.logoutText}
      >
        Log out
      </Button>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Button
        size="xs"
        variant="outline"
        style={styles.loginBtn}
        textStyle={styles.loginText}
        onPress={() => router.push("/login")}
      >
        Log in
      </Button>
      <View style={styles.divider} />
      <Button
        size="xs"
        style={styles.signUpBtn}
        textStyle={styles.signUpText}
        onPress={() => router.push("/register")}
      >
        Sign up
      </Button>
    </View>
  );
};

export default AuthButtons;
