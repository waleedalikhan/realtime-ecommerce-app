import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Controller } from "react-hook-form";
import useLogin from "@/hooks/useLogin";
import InputField from "@/components/global/ui/Input";
import { IconLoader } from "@/components/icons";
import Button from "@/components/global/ui/Button";
import styles from "@/styles/LoginForm.styles";

const LoginForm: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, loading } = useLogin();

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>
          Sign in to your account to continue.
        </Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Password"
                secureTextEntry
                error={errors.password}
              />
            )}
          />
          {errors.root ? (
            <Text style={styles.rootError}>{errors.root.message}</Text>
          ) : null}
          <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? <IconLoader /> : "Login"}
          </Button>
        </View>
        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Link href="/register" asChild>
            <Text style={styles.link}>Sign up</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;
