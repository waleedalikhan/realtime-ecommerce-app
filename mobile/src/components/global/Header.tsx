import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthButtons from "@/components/global/client/AuthButtons";
import styles from "@/styles/Header.styles";

const Header: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Link href="/" asChild>
          <Text style={styles.logo}>Realtime Commerce</Text>
        </Link>
        <View style={styles.nav}>
          <AuthButtons />
        </View>
      </View>
    </View>
  );
};

export default Header;
