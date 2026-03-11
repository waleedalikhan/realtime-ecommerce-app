import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Controller } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import InputField from "@/components/global/ui/Input";
import { IconLoader } from "@/components/icons";
import Button from "@/components/global/ui/Button";
import styles from "@/styles/RegisterForm.styles";

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
          <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
            {loading ? <IconLoader /> : "Register"}
          </Button>
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

export default RegisterForm;
