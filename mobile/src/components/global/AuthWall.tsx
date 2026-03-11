import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/global/ui/Button";
import styles from "@/styles/AuthWall.styles";

type Props = {
  message?: string;
};

const AuthWall: React.FC<Props> = ({
  message = "Please log in to proceed.",
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.message}>{message}</Text>
        <Link href="/login" asChild>
          <Button size="sm">Log in</Button>
        </Link>
      </View>
    </View>
  );
};

export default AuthWall;
