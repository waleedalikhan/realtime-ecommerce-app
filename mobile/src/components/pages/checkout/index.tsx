import React from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import AuthWall from "@/components/global/AuthWall";
import InputField from "@/components/global/ui/Input";
import useCheckout from "@/hooks/useCheckout";
import Button from "@/components/global/ui/Button";
import { IconLoader } from "@/components/icons";
import styles from "@/styles/Checkout.styles";

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
        <Text style={styles.subtitle}>Enter shipping and contact details.</Text>
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
          <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
            {loading ? <IconLoader /> : "Place order"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Checkout;
