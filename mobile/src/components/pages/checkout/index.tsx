import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import AuthWall from "@/components/global/AuthWall";
import InputField from "@/components/global/ui/Input";
import useCheckout from "@/hooks/useCheckout";
import Button from "@/components/global/ui/Button";
import { IconLoader } from "@/components/icons";
import { colors, spacing, typography, borderRadius } from "@/lib/theme";

const Checkout: React.FC = () => {
  const { token, control, handleSubmit, errors, onSubmit, loading } =
    useCheckout();

  if (!token) {
    return <AuthWall message="Please log in to checkout." />;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.subtitle}>
          Enter shipping and contact details.
        </Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="shippingAddress"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Shipping address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Street, city, postal code"
                error={errors.shippingAddress}
              />
            )}
          />
          <Controller
            control={control}
            name="contactEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Contact email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.contactEmail}
              />
            )}
          />
          <Controller
            control={control}
            name="contactPhone"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Contact phone (optional)"
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="+1 234 567 8900"
                keyboardType="phone-pad"
                error={errors.contactPhone}
              />
            )}
          />
          {errors.root ? (
            <Text style={styles.rootError}>{errors.root.message}</Text>
          ) : null}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={({ pressed }) => (pressed ? styles.pressed : undefined)}
          >
            <Button disabled={loading}>
              {loading ? <IconLoader /> : "Place order"}
            </Button>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
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
});

export default Checkout;
