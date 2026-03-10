import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Controller } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import InputField from "@/components/global/ui/Input";
import { IconLoader } from "@/components/icons";
import Button from "@/components/global/ui/Button";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const RegisterForm: React.FC = () => {
  const { control, handleSubmit, errors, onSubmit, loading } = useRegister();

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Register to shop and track orders in real time.
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Name (optional)"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Your name"
                error={errors.name}
              />
            )}
          />
          {errors.root && (
            <Text style={styles.rootError}>{errors.root.message}</Text>
          )}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <Button disabled={loading}>
              {loading ? <IconLoader /> : "Register"}
            </Button>
          </Pressable>
        </View>
        <Text style={styles.footer}>
          Already have an account?{" "}
          <Link href="/login" asChild>
            <Text style={styles.link}>Log in</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 448,
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
  },
  title: {
    ...typography["2xl"],
    ...typography.fontBold,
    color: colors.white,
  },
  subtitle: {
    marginTop: spacing.gap[2],
    ...typography.base,
    color: colors.stone[400],
  },
  form: { marginTop: spacing.gap[2] },
  rootError: {
    ...typography.sm,
    color: colors.red[400],
    marginBottom: spacing.gap[2],
  },
  pressed: { opacity: 0.9 },
  footer: {
    marginTop: spacing.gap[2],
    ...typography.sm,
    color: colors.stone[400],
    textAlign: "center",
  },
  link: {
    ...typography.fontMedium,
    color: colors.amber[400],
  },
});

export default RegisterForm;
